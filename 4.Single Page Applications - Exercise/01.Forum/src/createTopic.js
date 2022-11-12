import * as api from "./api.js";
import { showHome } from "./showHome.js";
let newTopicForm = document.querySelector("form");


export function createTopic(e){
    e.preventDefault();

   try{
    let formData = new FormData(newTopicForm);
    let postData = Object.fromEntries([...formData.entries()]);
    postData.createdTime = new Date().toLocaleDateString()
    for(let section of Object.values(postData)){
        if (section == ""){
            throw new Error("All fields are required!");
        }
    }
    api.post("posts",postData);
    newTopicForm.reset();
    showHome();
    
   }
   catch(error){
    alert(error.message);
    throw new Error();
   }


}