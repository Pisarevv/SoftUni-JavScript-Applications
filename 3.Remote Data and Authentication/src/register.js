document.querySelector("form").addEventListener('submit', onSubmit);


async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password')
        let repPassword = formData.get('rePass');

        try{
            if(email == "" || password == ""){
                throw new Error("All fields must be filled");
            }
            if(password != repPassword){
                throw new Error("Passwords don't match!");
            }

            let request = await fetch("http://localhost:3030/users/register", {
                method: "post",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
   

            if(request.ok == false){
                let error = await request.json();
                throw new Error(error.message);
            }

            const data = await request.json();

            sessionStorage.setItem('accessToken',data.accessToken);
            
            window.location = '/';






        }
        catch(error){
            alert(error);
        }
    
}
