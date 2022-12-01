import { deleteUser, setUser } from "../util.js";
import  * as api  from "./api.js";

export async function login(email,password){
   let result = await api.post('/users/login',{email,password});
   setUser(result);
}

export async function register(email,password){
    let result = await api.post('/users/register',{email,password});
    setUser(result);
 }

 export function logout(){
    api.get('/users/logout');
    deleteUser();
 }