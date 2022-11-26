import { deleteUser, setUser } from "../util.js";
import * as api from "./api.js"

let routes = {
    login : "/users/login",
    register : "/users/register",
    logout : "/users/logout"
}

export async function login(email,password){
    let request = await api.post(routes.login,{email , password});
    setUser(request);
}

export async function register(email,password){
    let request = await api.post(routes.register,{email , password});
    setUser(request);
}

export async function logout(){
    api.get(routes.logout);
    deleteUser();
}

