import * as api from './api.js';

let target = {
    'register' : 'http://localhost:3030/users/register',
    'login' : 'http://localhost:3030/users/login',
    'logout' : 'http://localhost:3030/users/logout'
}

export async function register(data){
    let request = await api.post(target.register, data);
    localStorage.setItem("user", JSON.stringify(request)); 
    update();
}


export async function login(data){
    let request = await api.post(target.login, data);
    localStorage.setItem("user", JSON.stringify(request)); 
    update();
}



export async function logout(id){
    api.post(target.logout);
    localStorage.clear();
    update();
}




export function update(){
    if(localStorage.getItem("user") != undefined){
        document.querySelector('#guest').style.display = "none";
        document.querySelector('#user').style.display = "inline";
    }
    else{
        document.querySelector('#guest').style.display = "inline";
        document.querySelector('#user').style.display = "none";
    }
};