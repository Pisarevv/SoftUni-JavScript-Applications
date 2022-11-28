import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";

let detailsTemplate = (data,isOwner,onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src="${data.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${data.brand}</span></p>
            <p>
                Model: <span id="details-model">${data.model}</span>
            </p>
            <p>Release date: <span id="details-release">${data.release}</span></p>
            <p>Designer: <span id="details-designer">${data.designer}</span></p>
            <p>Value: <span id="details-value">${data.value}</span></p>
        </div>
        ${isOwner 
        ? 
        html`<div id="action-buttons">
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" @click = ${onDelete} id="delete-btn">Delete</a>
        </div>`
        :
        nothing}
        
    </div>
</section>
`


export async function showDetails(ctx){
    let id = ctx.params.id;
    let currentObject = await getById(id);
    let isOwner = Boolean();
    let user = ctx.user;
    if(user){
        if(user._id == currentObject._ownerId){
            isOwner = true;
        }
    }

    ctx.render(detailsTemplate(currentObject,isOwner,onDelete));

    async function onDelete(){
        await deleteById(id);
        ctx.page.redirect('/catalog');
        
    }
}


