import { contacts as data } from './contacts.js';
import {html, render, nothing} from './node_modules/lit-html/lit-html.js';



let currContacts = data.map(c => Object.assign({}, c , {active : false}));
console.log(currContacts);

let root = document.querySelector("#contacts");
let body = document.querySelector("body");
body.addEventListener('click',showDetails);

let contactCard = (contact) => html`
        <div class="contact card" id=${contact.id}>
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${contact.name}</h2>
                <button class="detailsBtn">Details</button>
                ${contact.active 
                  ? html`<div class="details">
                    <p>Phone number: ${contact.phoneNumber}</p>
                    <p>Email: ${contact.email}</p>
                    </div>`
                  : nothing}
            </div>
        </div>`;
update();





function showDetails(e){
    if(e.target.tagName == "BUTTON"){
        let parentId = e.target.parentElement.parentElement.id;
        let manipulatedContact = currContacts.find(x => x.id == parentId);
        manipulatedContact.active = !manipulatedContact.active;
        update();
    }

}


function update(){
    render(currContacts.map(contactCard),root);
}