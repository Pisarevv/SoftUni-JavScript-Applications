import { getByName } from "../api/data.js";
import { html,render,nothing } from "../lib.js";
import { CreateSubmitHander } from "../util.js";

let searchTemplate = (onSearch) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit = ${onSearch} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>
    <div id="search-container">
        
    </div>
    
</section>`



let postTemplate = (data,user) => html`
<li class="card">
    <img src=${data.imageUrl} alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${data.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${data.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${data.value}</span>$</p>
    ${user ? html`<a class="details-btn" href="/catalog/${data._id}">Details</a>` : nothing}
</li>`;



export async function showSearch(ctx){
    ctx.render(searchTemplate(CreateSubmitHander(ctx,onSearch)))
}


async function onSearch(ctx,name,event){ 
    let data = await getByName(Object.values(name));
    let user = ctx.user;
    if(data.length == 0){
        render(html`<h2>There are no results found.</h2>`, document.getElementById("search-container"));
    }
    else{
        render(data.map(x => postTemplate(x,user)) ,document.getElementById("search-container"))
    }

}