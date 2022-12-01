import { getByUser } from "../api/data.js";
import { html } from "../lib.js";


let myPostsTemplate = (data) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    ${data.length == 0 ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>` 
    : html`<div class="my-posts"> ${data.map(postCardTemplate)} </div>`}

    
</section>`


let postCardTemplate = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src=${post.imageUrl} alt="${post.title}">
    <div class="btn-wrapper">
        <a href=${`/` + post._id} class="details-btn btn">Details</a>
    </div>
</div>`


export async function showMyPosts(ctx){
    let user = ctx.user;
    let data = await getByUser(user._id);
    ctx.render(myPostsTemplate(data));
}
