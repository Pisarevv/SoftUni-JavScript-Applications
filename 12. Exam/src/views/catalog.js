import { getAll } from "../api/data.js";
import { html } from "../lib.js";

let catalogTemplate = (data) => html`
<section id="dashboard">
    <h2>Albums</h2>
    ${data.length == 0 ? html` <h2>There are no albums added yet.</h2>` : html`<ul class="card-wrapper">${data.map(albumTemplate)}</ul>`}
</section>`;


let albumTemplate = (data) => html`
<li class="card">
    <img src=${data.imageUrl} alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${data.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${data.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${data.sales}</span></p>
    <a class="details-btn" href=${"/catalog/" + data._id}>Details</a>
</li>`;

export async function showCatalog(ctx){
    let albumData = await getAll();
    ctx.render(catalogTemplate(albumData));
}