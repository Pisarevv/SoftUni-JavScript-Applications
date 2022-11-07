export function isLoged(){
    let username = localStorage.getItem("username");
    if(username){
        homeButton.style.display = "inline";
        logoutButton.style.display = "inline";
        loginButton.style.display = "none";
        registerButton.style.display = "none";
        mainsField.style.display = "inline";
        greetingSpan = localStorage.getItem("username");
        
    }
    else{
        homeButton.style.display = "inline";
        logoutButton.style.display = "none";
        loginButton.style.display = "inline";
        registerButton.style.display = "inline";
        mainsField.style.display = "none";
        greetingSpan = localStorage.getItem("");
    }
}
