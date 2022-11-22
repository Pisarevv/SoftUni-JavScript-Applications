import {html} from '../node_modules/lit-html/lit-html.js';
import { getAllFurniture } from '../data.js';


let myFurnitureTemplate = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
${data.map(furnitureTemplate)}
`

let contex = null;


export async function showMyFurniture(ctx) {
    contex = ctx;
    let user = JSON.parse(localStorage.getItem("user"));
    let furniture = await getAllFurniture();
    let myFurniture = furniture.filter(x => x._ownerId == user._id);
    ctx.render(myFurnitureTemplate(myFurniture));


}

let furnitureTemplate = (furniture) => html`
<div class="col-md-4">
         <div class="card text-white bg-primary">
             <div class="card-body">
                   <img src="${furniture.img}" />
                   <p>Description here</p>
                   <footer>
                      <p>Price: <span>${furniture.price} $</span></p>
                   </footer>
                   <div>
                      <a href=”#” class="btn btn-info">Details</a>
                   </div>
              </div>
         </div>
    </div>`