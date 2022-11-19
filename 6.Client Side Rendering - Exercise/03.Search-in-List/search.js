import {towns} from './towns.js';
import { html, nothing, render } from '../node_modules/lit-html/lit-html.js';
import {repeat} from '../node_modules/lit-html/directives/repeat.js'
import {classMap} from '../node_modules/lit-html/directives/class-map.js';

let root = document.querySelector("#towns");
let searchButton = document.querySelector("button");
let searchInput = document.querySelector("#searchText");



searchButton.addEventListener('click', search);
loadCities();

function search() {
   let townToSearch = searchInput.value;
   townToSearch = townToSearch.charAt(0).toUpperCase() + townToSearch.slice(1);
   let results = towns.filter(t => {
      if(t.includes(townToSearch)){
         let match = document.getElementById(`${t}`);
         match.setAttribute('class', 'active');
         return t;
      }
      else{
         let element = document.getElementById(`${t}`);
         element.removeAttribute('class');
      }
   })
   
   let resultHTML = document.getElementById("result");
   resultHTML.textContent = `${results.length} matches found`;
   

}




function loadCities () {
   let cardTemplate = (data) => {
      return html`
      <ul>
         ${data.map(x => html`<li id=${x}>${x}</li>`)}
      </ul>`
   }
   render(cardTemplate(towns), root)
}


