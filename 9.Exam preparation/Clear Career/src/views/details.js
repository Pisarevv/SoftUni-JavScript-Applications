import { checkCanApply, getAppCount, offerApply } from "../api/application.js";
import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";

let detailsTemplate = (data,user,isOwner,appCount,canApply,onDelete,onApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-title">${data.title}</p>
        <p id="details-category">
            Category: <span id="categories">${data.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${data.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${data.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${data.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${appCount}</strong></p>
    <div id="action-buttons">
    ${isOwner  ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
                 <a href="javascript:void(0)" @click = ${onDelete} id="delete-btn">Delete</a>`
             : nothing}
           
    ${user && !isOwner && canApply == 0 ? html`<a href="javascript:void(0)" @click = ${onApply} id="apply-btn">Apply</a>` : nothing}
</div>
        
    </div>
</section>`

export async function showDetails(ctx){
    let id = ctx.params.id;
    let request = [
        getById(id),
        getAppCount(id)
    ]
    //let data = await getById(id);
    let user = ctx.user;
    let isOwner = Boolean();
    if(user){
        request.push(checkCanApply(id,user._id))
    }
    let [data,appCount,canApply] = await Promise.all(request);
    if(user){
        if(user._id == data._ownerId){
            isOwner = true;
        }
    }
    ctx.render(detailsTemplate(data,user,isOwner,appCount,canApply,onDelete,onApply))

    async function onDelete(){
        await deleteById(id);
        ctx.page.redirect('/catalog');
    }

    async function onApply(){
        await offerApply(id);
        ctx.page.redirect('/catalog/'+ id);
    }
}