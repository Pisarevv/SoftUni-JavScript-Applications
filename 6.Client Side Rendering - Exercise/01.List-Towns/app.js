import { render, html } from '../node_modules/lit-html/lit-html.js';
import {repeat} from '../node_modules/lit-html/directives/repeat.js'


let root = document.querySelector("#root");
let form = document.querySelector("form");
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let towns = formData.get("towns").split(", ");
    let generateTowns = (input) => {
        return html`
    <ul>
        ${repeat(input, (index) => index = Math.floor(Math.random() * 1000), (input,index) => 
        html`<li ${index}>${input}</li>`)};
    </ul>`;
    }
    render(generateTowns(towns), root);
    form.reset();
}





