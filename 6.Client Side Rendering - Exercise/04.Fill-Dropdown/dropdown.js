import { html, nothing, render } from '../node_modules/lit-html/lit-html.js';
import * as api from './api.js'

let root = document.querySelector("#menu");
let form = document.querySelector("form");
form.addEventListener('submit', addItem)

update();


let optionTemplate = (result) => {
    return result.map(x => html`<option id = ${x._id}>${x.text}</option>`);
}


async function addItem(e) {
    e.preventDefault();
    let city = document.querySelector("#itemText").value;
    let result = await api.post("/dropdown",{text : city});
    form.reset();
    update();
    
}

async function update(){
    let data = await api.get('/dropdown');
    let items = Object.values(data);
    render(optionTemplate(items),root)
}


