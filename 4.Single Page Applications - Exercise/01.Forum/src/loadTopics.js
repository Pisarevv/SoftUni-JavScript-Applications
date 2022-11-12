import * as api from "./api.js";
let topicsContainter = document.querySelector(".topic-container");


export async function loadTopics(){

    let requestData = await api.get('posts');
    let topicsFragment = document.createDocumentFragment();
    for(let topic of Object.entries(requestData)){
        topicsFragment.appendChild(generateTopic(topic[1]));
    }

    topicsContainter.replaceChildren(topicsFragment);

}



function generateTopic(inputData){
    let element = document.createElement("div");
    element.innerHTML = `<div class="topic-name-wrapper">
    <div class="topic-name" id=${inputData._id}>
        <a href="/" class="normal">
            <h2>${inputData.topicName}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${inputData.createdTime}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${inputData.username}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>`
   return element;
}