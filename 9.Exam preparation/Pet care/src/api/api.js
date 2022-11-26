import { deleteUser, getToken } from "../util.js";

let target = "http://localhost:3030";

async function request(method,url,data){
    let options = {
        method,
        headers: {}
    }

    if(data){
        options.headers["Content-type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    let token = getToken();

    if(token){
        options.headers['X-Authorization'] = token;
    }

    try{
        let result = await fetch(target + url, options);

        if(result.status == 204){
            return result;
        }

        let resultData = await result.json();

        if(result.ok != true){
            if(result.status == 403){
                deleteUser();
            }
            throw new Error(resultData);
            
        }

        else{
            return resultData;
        }

    }
    catch(error){
        alert(error.message);
        throw new Error();
    }
}


async function post(url,data){
    return request('post',url,data)
}

async function get(url){
    return request('get',url)
}

async function put(url,data){
    return request('put',url,data)
}

async function del (url){
    return request('delete',url)
}

export{
    post,
    get,
    put,
    del as delete
}