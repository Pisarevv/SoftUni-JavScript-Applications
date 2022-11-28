import { getAll } from "../api/data.js";
import { html } from "../lib.js";


let dashboardTemplate = (data) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
    ${data.length == 0 ? html`<h2>There are no items added yet.</h2>` : data.map(postTemplate)};  
    </ul>
    
</section>
`;


let postTemplate = (data) => html`
<li class="card">
    <img src=${data.imageUrl} alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${data.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${data.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
    <a class="details-btn" href="/catalog/${data._id}">Details</a>
</li>`;


export async function showCatalog(ctx){
    let data = await getAll();
    ctx.render(dashboardTemplate(data))
}
