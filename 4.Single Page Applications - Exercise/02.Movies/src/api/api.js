let target = 'http://localhost:3030';

async function request(method,url,body){
    let options = {
        method,
        headers : {

        }
    }

    try {
        if(body != undefined){
            options.headers['Content-type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
    
        let user = JSON.parse(localStorage.getItem('user'));
    
        if(user){
            options.headers['X-Authorization'] = user.accessToken;
        }
    
        let result = await fetch(target + url,options);
    
        if(result.ok != true){
            throw new Error(result.json());
        }
        if(result.status == 204){
            return result;
        }

        if(result.status == 401){
            throw new Error("Please log in!");
        }

        return result.json();
        

    } 
    catch (error) {
        alert(error.message);
        throw new Error();
        
    }

}


async function get(url){
    return request('get',url);
};

async function post(url,body){
    return request('post',url,body);
};


async function put(url,body){
    return request('put',url,body);
};


async function del(url){
    return request('delete',url);
};



export{
    get,
    post,
    put,
    del as delete
}