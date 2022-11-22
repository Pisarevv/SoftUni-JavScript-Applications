import {html} from '../node_modules/lit-html/lit-html.js';
import { deleteFurniture, getFurtitureDetails } from '../data.js';

let detailsTemplate = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=".${data.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        ${checkUser(data._ownerId,data._id)}
</div>` 

let currentId = null;

export async function showDetails(ctx){
    let id = ctx.params.id;
    currentId = id;
    let furnitureInfo = await getFurtitureDetails(id)
    ctx.render(detailsTemplate(furnitureInfo));

}


function checkUser(ownerId,furnitureId){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != null){
        if(user._id == ownerId){
            return html`<div>
            <a href=${`/edit/` + furnitureId} class="btn btn-info">Edit</a>
            <a href='/' @click= ${() =>{deleteFurniture(currentId)}} class="btn btn-red">Delete</a>
        </div>`
    }}
}