import * as api from '../api/api.js';
import { showDetails } from './details.js';
let target = "/data/movies/";
let section = document.querySelector("#edit-movie");
let form = section.querySelector("form");
form.addEventListener('submit', onSubmit)
section.remove();
let ctx = null;
let currentMovie = null;

export function editMovie(context, movieInfo) {
    ctx = context;
    currentMovie = movieInfo;
    context.showSection(section);
    fillForm(currentMovie);
}

async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let title = formData.get("title");
    let description = formData.get("description");
    let img = formData.get("img");

    if (title == "" || description == "" || img == "") {
        throw new Error("All fields are required!");
    }
    let dataToSend = {
        title,
        description,
        img
    }

    api.put(target+currentMovie._id, dataToSend);
    form.reset();
    showDetails(ctx,currentMovie._id);
    
}



function fillForm(data) {
    form.querySelector("#title").value = data.title;
    form.querySelector("textarea").value = data.description;
    form.querySelector("#imageUrl").value = data.img;
}