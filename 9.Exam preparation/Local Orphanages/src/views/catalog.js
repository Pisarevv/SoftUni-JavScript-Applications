import { getAll } from "../api/data.js";
import { html } from "../lib.js";

let catalogTemplate = (data) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    <div class="all-posts">
    ${data.length == 0 ? html`<h1 class="title no-posts-title">No posts yet!</h1>` : data.map(postCardTemplate)}
    </div>
</section>`


let postCardTemplate = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src=${post.imageUrl} alt="${post.title}">
    <div class="btn-wrapper">
        <a href=${`/catalog/` + post._id} class="details-btn btn">Details</a>
    </div>
</div>`


export async function showCatalog(ctx){
    let data = await getAll();
    ctx.render(catalogTemplate(data));
}