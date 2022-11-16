import { register } from "../api/data.js";

let section = document.querySelector("#form-sign-up");
section.querySelector("form").addEventListener('submit', onSubmit)
section.remove();

let ctx = null;

export function showRegister(context){
    context.showSection(section);
    ctx = context;
}

function onSubmit(e){
    e.preventDefault();
    register();
    ctx.goTo('/home');
    ctx.updateNav();
}