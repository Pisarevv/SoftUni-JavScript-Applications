import { getAll } from '../api/data.js';
import { html } from '../lib.js';


let catalogTemplate = (data) => html`
<section id="dashboard">
    <h2>Job Offers</h2>
    ${data.length == 0 ? html`<h2>No offers yet.</h2>` : data.map(offerTemplate)}
</section>
`

let offerTemplate = (data) => html`
 <div class="offer">
        <img src=${data.imageUrl} alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${data.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${data.salary}</span></p>
        <a class="details-btn" href=${`/catalog/` + data._id}>Details</a>
</div>`


export async function showCatalog(ctx){
    let data = await getAll();
    ctx.render(catalogTemplate(data));
}