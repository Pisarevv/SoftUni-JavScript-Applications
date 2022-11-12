import {loadTopics} from "./loadTopics.js";
import {createTopic} from "./createTopic.js";
import { showDetailsPage } from "./showDetails.js";

window.addEventListener('click', showDetails);
let postButton = document.querySelector("form .new-topic-buttons .public");
postButton.addEventListener('click', createTopic);


let section = document.querySelector("#homePage");
let documentMain =  document.querySelector("main");
documentMain.replaceChildren();

export function showHome(){
    documentMain.replaceChildren(section);
    loadTopics();
}


function showDetails(e){
    e.preventDefault();
    if(e.target.tagName == "H2"){
        let targetId = e.target.parentElement.parentElement.id;
        showDetailsPage(targetId);
    }
}