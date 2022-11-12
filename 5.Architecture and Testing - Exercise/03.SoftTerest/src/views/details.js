import { deleteById, getById } from "../api/data.js";

let section = document.querySelector("#detailsPage");

export async function showDetails(context,id){
    const idea = await getById(id);

    context.showSection(section);
    let user = JSON.parse(localStorage.getItem("user"));
    let isOwner = user && user._id == idea._ownerId;

    section.innerHTML = createIdeaHTML(idea,isOwner);

    if(isOwner){
        section.querySelector("#deleteBtn").addEventListener('click', async (event) =>{
            event.preventDefault();
            deleteById(id);
        })
    }

}

function createIdeaHTML(idea){
    let html = `<img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`
   

    if(isOwner){
        html +=  `<div class="text-center">
        <a id = "deleteBtn" class="btn detb" href="">Delete</a>
    </div>`;
    }

    return html;
}