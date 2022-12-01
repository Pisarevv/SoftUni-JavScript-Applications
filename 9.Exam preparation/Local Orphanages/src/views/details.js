import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";


let detailsTemplate = (data,hasUser,isOwner,onDelete) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${data.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${data.title}</h2>
                <p class="post-description">${data.description}</p>
                <p class="post-address">${data.address}</p>
                <p class="post-number">${data.phone}</p>
                <p class="donate-Item">Donate Materials: 0</p>

                <!--Edit and Delete are only for creator-->
                <div class="btns">
                   ${isOwner ? 
                    html` <a href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                    <a href="javascript:void(0)" @click = ${onDelete} class="delete-btn btn">Delete</a>` 
                    : nothing}

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    ${hasUser && !isOwner ? html`<a href="#" class="donate-btn btn">Donate</a>` : nothing}
                </div>

            </div>
        </div>
    </div>
</section>`

export async function showDetails(ctx){
    let id = ctx.params.id;
    let data = await getById(id);
    let hasUser = ctx?.user;
    let isOwner = Boolean();
    if(data._ownerId == hasUser._id){
        isOwner = true;
    }

    ctx.render(detailsTemplate(data,hasUser,isOwner,onDelete));

    
    async function onDelete(){
       await deleteById(id);
       ctx.page.redirect("/catalog");
    }

}