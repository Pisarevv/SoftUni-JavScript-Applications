import { register } from "../api/users.js";

let section = document.querySelector("#form-sign-up");
section.querySelector("form").addEventListener('submit', onSubmit)
section.remove();

let ctx = null;

export function showRegister(context) {
    context.showSection(section);
    ctx = context;
}

async function onSubmit(e) {
    e.preventDefault();
    try{
        let form = document.querySelector("form");
        let formData = new FormData(form);
    
        let email = formData.get("email");
        let password = formData.get("password");
        let rePassword = formData.get("repeatPassword");
    
        if (email == "") {
            throw new Error("All fields are required")
        }
        if (password != rePassword) {
            throw new Error("Passwords don't match")
        }
    
        let dataToSend = {
            email,
            password
        };
        await register(dataToSend);
        ctx.updateNav();
        ctx.goTo('/home');
    }
    catch(error){
        alert(error.message)
    }
    

}


