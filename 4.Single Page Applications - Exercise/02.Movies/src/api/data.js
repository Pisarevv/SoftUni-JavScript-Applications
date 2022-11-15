import * as api from '../api/api.js';
export async function register(){

    let form = document.querySelector("form");
    let formData = new FormData(form);

    let email = formData.get("email");
    let password = formData.get("password");
    let rePassword = formData.get("repeatPassword");

    if(email == ""){
        throw new Error("All fields are required")
    }
    if(password != rePassword){
        throw new Error("Passwords don't match")
    }

    let dataToSend = {
        email,
        password
    };

    let result = await api.post('/users/register',dataToSend);
    localStorage.setItem('user', JSON.stringify(result));
}
    
