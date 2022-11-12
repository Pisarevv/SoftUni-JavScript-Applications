import { createIdea } from "../api/data.js";

let section  = document.querySelector("#createPage");
let form = section.querySelector("form");
form.addEventListener('submit', onSubmit);

let ctx = null;
export function showCreate(context){
    context.showSection(section);
    ctx = context;

}

async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(form);
    let title = formData.get("title");
    let description = formData.get("description");
    let img = formData.get("imageURL");

    await createIdea({
        title,
        description,
        img
    });
    form.reset();
    ctx.goTo('/catalog')

}