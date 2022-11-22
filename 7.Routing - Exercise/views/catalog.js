import {html} from '../node_modules/lit-html/lit-html.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js'
import { getAllFurniture } from '../data.js';

let dashboardTemplate = (data) => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
    ${repeat(data, f => f._id, furnitureTemplate)}
    `



export async function showDashboard(ctx){
    let furniture = await getAllFurniture();
    ctx.render(dashboardTemplate(furniture));
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
                      <a href=${`/details/` + furniture._id} class="btn btn-info">Details</a>
                   </div>
              </div>
         </div>
    </div>`