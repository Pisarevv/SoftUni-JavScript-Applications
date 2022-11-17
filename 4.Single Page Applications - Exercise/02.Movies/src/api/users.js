import * as api from './api.js';

const routes = {
    'register' : "/users/register",
    'logout' : "/users/logout",
    'login' : "/users/login"
}

export async function register(data){
    let result = await api.post(routes.register,data);
    localStorage.setItem("user", JSON.stringify(result));
}
    
export async function logout(){
    api.post(routes.logout);
    localStorage.removeItem('user');
}

export async function login(data){
    let result = await api.post(routes.login,data);
    localStorage.setItem("user", JSON.stringify(result));
}