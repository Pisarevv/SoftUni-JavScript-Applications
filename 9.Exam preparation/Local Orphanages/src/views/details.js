import { deleteById, getById } from "../api/data.js";
import { checkIfDonated, getDonatesCount, makeDonation } from "../api/donations.js";
import { html, nothing } from "../lib.js";


let detailsTemplate = (data, hasUser, isOwner, donatesCount, hasDonated, onDelete, onDonate) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${data.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${data.title}</h2>
                <p class="post-description">Description: ${data.description}</p>
                <p class="post-address">Address: ${data.address}</p>
                <p class="post-number">Phone number: ${data.phone}</p>
                <p class="donate-Item">Donate Materials: ${donatesCount}</p>

                ${buttonsTemplate(data, isOwner, hasUser, hasDonated, onDelete, onDonate)}


            </div>
        </div>
    </div>
</section>`

let buttonsTemplate = (data, isOwner, hasUser, hasDonated, onDelete, onDonate) => {
    if (isOwner) {
        return html`<div class="btns"><a href=${`/edit/` + data._id} class="edit-btn btn">Edit</a>
    <a href="javascript:void(0)" @click=${onDelete} class="delete-btn btn">Delete</a>
</div>`;
    }
    else if (!isOwner && hasUser && hasDonated == 0) {
        return html`<div class="btns">
    <a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a> </div>`;
    }
}





export async function showDetails(ctx) {
    let postId = ctx.params.id;
    //let data = await ;
    let request = [getById(postId),
    getDonatesCount(postId)]
    let hasUser = ctx?.user;
    if (hasUser) {
        request.push(checkIfDonated(postId, hasUser._id))
    }

    let isOwner = Boolean();

    let [data, donatesCount, hasDonated] = await Promise.all(request);
    if (hasUser) {
        if (data._ownerId == hasUser._id) {
            isOwner = true;
        }
    }



    ctx.render(detailsTemplate(data, hasUser, isOwner, donatesCount, hasDonated, onDelete, onDonate));



    async function onDonate() {
        await makeDonation(postId)
        ctx.page.redirect('/' + postId);

    }

    async function onDelete() {
        let result = await deleteById(postId);
        ctx.page.redirect("/");
    }

}