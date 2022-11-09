let tagret = "http://localhost:3030/jsonstore/"

async function request(url,method,body){

    let options = {
        method : method,
        headers : {
            "Content-type" : "application/json"
        }

    }

    if(body !== undefined){
        options.body = JSON.stringify(body);
    }

    try{
        let response = await fetch(tagret + url, options);

        if(response.ok != true){
            let error = await response.json();
            throw new Error(error.message);
        }

        return response.json();


    }
    catch(error){
        alert (error.message);
        throw new Error;
    }
}


function get(url){
   return request(url,'get')
}

function post(url,body){
    return request(url,'post',body);
}

function put(url,body){
   return request(url,'put',body);
}

function del(url){
    return request(url,"delete");
}

export {
    get,
    post,
    put,
    del as delete
}