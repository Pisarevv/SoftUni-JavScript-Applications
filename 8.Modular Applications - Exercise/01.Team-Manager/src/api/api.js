import { getAccessToken, deleteUser } from "../util.js";

let target = 'http://localhost:3030';

async function request(url,method,data){
    let options = {
        method,
        headers : {}
    }

    let token = getAccessToken();

    if(token){
        options.headers['X-Authorization'] = token;
    }

    if(data) {
       options.headers['Content-type'] = "application/json";
       options.body = JSON.stringify(data);
    }

    try{
        let result = await fetch(target + url,options);

        if(result.ok != true){

            if(result == 403){
                deleteUser();
            }
         throw new Error(await result.json());
        
        }
        if(result.status == 204){
            return result;
        }
        else{
            return result.json();
        }
        
    }
    catch(error){
        alert(error.message);
        throw new Error();
    }

}


async function get(url){
    return request(url,'get');
}
async function post(url,data){
    return request(url,'post',data);
}

async function del(url){
    return request(url,'del');
}

async function put(url){
    return request(url,'put',data);
}

export {
    get,
    post,
    put,
    del as delete
}