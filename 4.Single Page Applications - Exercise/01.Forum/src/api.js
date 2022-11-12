let taret = "http://localhost:3030/jsonstore/collections/myboard/";
async function request(url,method,body){
    try{
        let options = {
            method:method,
            headers:{
                "Content-type" : "application/json"
            }
        }
    
        if(body !== undefined){
            options.body = JSON.stringify(body)
        }
    
        let request = await fetch(taret+url,options);

        if(request.ok != true){
            let error = await request.json();
            throw new Error(error);
        }

        return request.json();
    }
    catch(error){
        alert (error.message);
        throw new Error();
    }
}


export function post(url,body){
    return request(url,'post',body);
}

export function put(url,body){
    return request(url,'put',body);
}

export function get(url){
    return request(url,'get');
}

