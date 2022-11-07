document.querySelector("#user").style.display = "none";
let form = document.querySelector("section#login-view #login");
form.addEventListener('submit', login);
let url = "http://localhost:3030/users/login";


async function login(e){
   
    e.preventDefault();
    
    try{
        let dataFromForm = new FormData(form);
        let email = dataFromForm.get("email");
        let password = dataFromForm.get("password");

        if(email == "" || password ==""){
            throw new Error("Please fill all fields")
        }

        let dataToSend = {
            email,
            password
        }

        let request = await fetch(url, {
            method : "post",
            headers: {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(dataToSend)
        })

        if(request.ok != true){
            let error = await request.json();
            throw new Error(error.message);
        }
        
        let data = await request.json();
       

        sessionStorage.setItem("email",data.email);
        sessionStorage.setItem("id",data._id);
        sessionStorage.setItem("accessToken",data.accessToken);
        window.location = 'http://127.0.0.1:5500/05.Fisher-Game/src/index.html';

        

    }
    catch(error){
        alert(error.message);
    }

}

