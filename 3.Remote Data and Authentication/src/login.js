document.querySelector("form").addEventListener('submit', onSubmit);


async function onSubmit(e){
    e.preventDefault;
    let formData = new FormData(e.target);
    
    try{
        
          let email = formData.get('email');
          let password = formData.get('password');
        
        
        if(email == "" || password == ""){
            throw new Error("Input fields cannot be empty");

        }
    
        let request = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers : {
                'Content-type': 'application/json'
            },
            body : JSON.stringify({
                email,
                password
            })
        });

        if(request.ok == false){
            let error = await request.json();
            throw new Error(error.message);
        }

        let data = await request.json();

        sessionStorage.setItem('accessToken',data.accessToken);

        window.location = '/';
    }
    catch(error){
        alert(error);
    }



}