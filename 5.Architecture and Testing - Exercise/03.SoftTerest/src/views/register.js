import { register } from "../api/users.js";

let section = document.querySelector("#registerPage");
let form = section.querySelector("form");
form.addEventListener('submit', onSubmit);
let ctx = null;
export function showRegister(context){
    context.showSection(section);
}

async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(form);
    let email = formData.get("email");  
    let password = formData.get("password");

    await register(email,password);
    form.reset();
    ctx.updateNav();
    ctx.goTo('/'); 
}