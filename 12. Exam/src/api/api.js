import { deleteUser, getAccessToken } from "../util.js";

let target = "http://localhost:3030"

async function request(method,url,data){
    let options = {
        method,
        headers:{}
    }

    if(data){
        options.headers["Content-type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    let token = getAccessToken();

    if(token){
        options.headers['X-Authorization'] = token;
    }

    try{
        let response = await fetch(target + url,options);

        if(response.status == 204){
            return response;
        }

        let result = await response.json();

        if(response.ok != true){
            if(response.status == 403){
                deleteUser();
            }

            throw new Error(response.message);
        }

        return result;
    }
    catch(error){
        alert(error.message);
        throw new Error();
    }


}



function post(url,data){
    return request("post",url,data)
}

function get(url){
    return request("get",url);
}

function put(url,data){
    return request("put",url,data)
}

function del (url){
    return request("delete",url);
}

export {
    post,
    get,
    put,
    del as delete
}