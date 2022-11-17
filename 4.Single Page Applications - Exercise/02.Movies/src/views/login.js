import { login } from "../api/users.js";
let section = document.querySelector("#form-login");
let form = section.querySelector("form");
form.addEventListener('submit', onSubmit);
section.remove();

let ctx = null;

export function showLogin(context){
    ctx = context;
    context.showSection(section);
}

async function onSubmit(e){
    e.preventDefault();
    try{
    let formData = new FormData(form);
    let email = formData.get("email");
    let password = formData.get("password");

    if(email ==  "" || password == ""){
        throw new Error("All fields are required!");
    }
    let dataToSend = {
        email,
        password
    }

    await login(dataToSend);
    form.reset();
    ctx.goTo('/home');
    ctx.updateNav();
   
    }
    catch(error){
        alert(error.message);
    }





}