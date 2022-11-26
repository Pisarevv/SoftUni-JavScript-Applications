export function getUser(){
    let user = JSON.parse(localStorage.getItem("user"));
    return user;
}

export function setUser(data){
    localStorage.setItem("user", JSON.stringify(data));
}

export function deleteUser(){
    localStorage.removeItem("user");
}

export function getToken(){
    let user = getUser();
    if(user){
        return user.accessToken;
    }
    else{
        return null;
    }
}


export function createSubmitHandler(ctx,handler){
    return function (event){
      event.preventDefault()
      let formData = Object.fromEntries(new FormData(event.target));
      handler(ctx, formData, event);
    }
}