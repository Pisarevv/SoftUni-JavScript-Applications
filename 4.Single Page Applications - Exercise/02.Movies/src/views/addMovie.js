import * as api from '../api/api.js';
let target = '/data/movies';
let section = document.querySelector("#add-movie");
let form = section.querySelector("form");
form.addEventListener('submit', onSubmit)
section.remove();

let ctx = null;

export function showAddMovie(context){
    context.showSection(section);
    ctx = context;
}

async function onSubmit(e){
    try{
        e.preventDefault();
        let formData = new FormData(form);
        let title = formData.get("title");
        let description = formData.get("description");
        let img = formData.get("img");
    
        if(title == "" || description == "" || img == ""){
            throw new Error("All fields are required!");
        }
        let dataToSend = {
            title,
            description,
            img
        }
        
        api.post(target,dataToSend);
        form.reset();
        ctx.goTo('/home');
        
    }
    catch(error){
        alert(error.message);
    }
   
}