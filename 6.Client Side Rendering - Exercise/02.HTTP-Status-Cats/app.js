import { html, nothing, render } from '../node_modules/lit-html/lit-html.js';
import {cats as catsData} from './catSeeder.js';

let root = document.querySelector("#allCats");
let catsSection = document.querySelector("#allCats");

let cats = catsData.map(c => Object.assign({}, c, {active : false}));
console.log(cats);

catsSection.addEventListener('click', onClick)

let createCats = (inputCats) => {
    return html`
    <ul> 
        ${inputCats.map(catTemplate)}
    </ul>
    `
}
update();


function onClick(e){
    e.preventDefault();
    let target = e.target;
    if(target.tagName == "BUTTON"){
        let currentCatId = target.parentElement.parentElement.id;
        let currentCat = cats.find(x => x.id == currentCatId);
        currentCat.active = !currentCat.active;
        currentCat.active ? target.textContent = "Hide status code" :  target.textContent = "Show status code";
        update();
    }
    
}

function catTemplate(cat){
    return html`
    <li id=${cat.id} >
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
       <div class="info">
         <button class="showBtn">Show status code</button>
           ${cat.active 
            ? html`<div class="status">
                <h4>Status Code: ${cat.statusCode}</h4>
                     <p>${cat.statusMessage}</p>
           </div>`
            : nothing}
        </div>
    </li>`;

}

function update(){
    render(createCats(cats),root);
}