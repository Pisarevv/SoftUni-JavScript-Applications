import { deleteById, getById } from "../api/data.js";
import { checkIfCanLike, getLikesCount, likeAlbum } from "../api/likes.js";
import { html } from "../lib.js";



let detailsTemplate = (data,likesCount, hasUser, isOwner,canLike,onDelete,onLike) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${data.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${data.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likesCount}</span></div>

        ${buttonsTemplate(data, hasUser, isOwner,canLike,onDelete,onLike)}

    </div>
</section>`;


let buttonsTemplate = (data,hasUser,isOwner,canLike,onDelete,onLike) => {
    if(isOwner){
        return  html`
        <div id="action-buttons">
            <a href=${`/edit/` + data._id } id="edit-btn">Edit</a>
            <a href="javascript:void(0)" @click = ${onDelete} id="delete-btn">Delete</a>
        </div>
        `;
    }
    if(hasUser && !isOwner && canLike == 0){
        return  html`
        <div id="action-buttons">
            <a href="javascript:void(0)" @click = ${onLike} id="like-btn">Like</a>
        </div>
        `;
    }
  
}


export async function showDetails(ctx){
    let id = ctx.params.id;
    let request = [getById(id),getLikesCount(id)];
    let hasUser = ctx.user;
    let isOwner = Boolean();
    if(hasUser){
       request.push(checkIfCanLike(id,hasUser._id));
    }

    let [data, likesCount, canLike] = await Promise.all(request);
    if(hasUser){
        if(data._ownerId == hasUser._id){
            isOwner = true;
        }
    }
    ctx.render(detailsTemplate(data,likesCount, hasUser, isOwner,canLike,onDelete,onLike));

    async function onDelete(){
        await deleteById(id);
        ctx.page.redirect('/catalog');
    }

    async function onLike(){
        await likeAlbum(id);
        ctx.page.redirect('/catalog/' + id);
    }
    
}


