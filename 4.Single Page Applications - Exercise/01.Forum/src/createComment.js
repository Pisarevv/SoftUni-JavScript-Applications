import * as api from "./api.js";
import {loadComments} from "./loadComm.js"
let targetUrl = "comments";

export async function createComment(data){

    let request = await api.post(targetUrl,data);
    loadComments();

}