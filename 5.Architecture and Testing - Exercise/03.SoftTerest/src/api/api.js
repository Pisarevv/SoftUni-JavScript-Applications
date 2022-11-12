const target = "http://localhost:3030"
async function request(method,url,data){
   try {
    let options = {
        method,
        headers: {}
    }

    if(data != undefined){
        options.headers ={
            "Content-type" : "application/json"
        };
        options.body = JSON.stringify(data);
    }

    let user = JSON.parse(localStorage.getItem('user'));

    if(user){
    options.headers["X-Authorization"] = user.accessToken;
    }

    let response = await fetch(target+url,options);
    
    if(response.ok != true){
        if(response.status == 403){
            localStorage.clear("user");
        }
        let error = await response.json();
        throw new Error(error);

    }

    if(response.status == 204){
        return response
    }
    else{
        return response.json();
    }

   

   } catch (error) {
    alert(error.message);
    throw new Error();
    
   }
}


const get = request.bind(null,"get");
const post = request.bind(null,"post");
const put = request.bind(null,"put");
const del = request.bind(null,"delete");

export{
    get,
    post,
    put,
    del as delete
}