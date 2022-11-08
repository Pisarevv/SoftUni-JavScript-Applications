//buttons
let homeButton = document.querySelector("#home");
let logoutButton = document.querySelector("#logout");
let loginButton = document.querySelector("#login");
let registerButton = document.querySelector("#register");
let mainsField = document.querySelector("#main");
let greetingSpan = document.querySelector(".email span");
let addButton = document.querySelector("button.add");

//catchesdiv
let catchesDiv = document.querySelector("div#catches");
catchesDiv.replaceChildren();

let mainCathcesDiv = document.querySelector("section#home-view #catches").addEventListener('click', manipulateCatch)

let loadCatchButton = document.querySelector("button.load");
loadCatchButton.addEventListener('click', loadCatch)

window.addEventListener("load", isLoged);
logoutButton.addEventListener("click", logout);

//forms
let addForm = document.querySelector("#addForm");
addForm.addEventListener('submit', addCatch);


async function loadCatch(e){
   
    try{
        let request = await fetch("http://localhost:3030/data/catches");

        if(request.ok != true){
            let error = await request.json();
            throw new Error(error.message);
        }
        
        let data = await request.json();
        
        let fragment = document.createDocumentFragment();
        for(let catche of Object.values(data)){
            let newCatche = createCatch(catche.angler,catche.weight,catche.species,catche.location,catche.bait,catche.captureTime,catche._id);
            newCatche.id = catche._ownerId;
            newCatche.setAttribute("catch-id",catche._id);
            fragment.appendChild(newCatche);
        }

        catchesDiv.replaceChildren(fragment);
        document.querySelectorAll(".catch").forEach(x => {
            if(x.id != sessionStorage.getItem("id")){
                x.querySelectorAll("button").forEach(x => x.disabled = true)
            }
        })
        


        
        
    }
    catch(error){
        alert(error.message);
    }


}


async function addCatch(e){
    e.preventDefault();
    let urlCreate =  "http://localhost:3030/data/catches";
    try{
        let formData = new FormData(addForm);

        let angler = formData.get("angler");
        let weight = formData.get("weight");
        let species =formData.get("species");
        let location = formData.get("location");
        let bait = formData.get("bait");
        let captureTime = formData.get("captureTime");

        let dataToSend = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };

        let token = sessionStorage.getItem("accessToken")

        let request = await fetch(urlCreate,{
            method: "post",
            headers: {
                "Content-type" : "application/js",
                "X-authorization" : token
            },
            body: JSON.stringify(dataToSend)
        });

        if(request.ok != true){
            let error = await request.json();
            throw new Error(error.message);
        }
        loadCatch();


    }
    catch(error){
        alert(error.message);
    }



}


function manipulateCatch(e){
    let target = e.target;

    if(target.classList == "update"){
        updateCatch(target);
    }
    else if(target.classList == "delete"){
        deleteCatch(target);

    }

}


async function updateCatch(target){
    let catchDiv = target.parentElement;
    let catch_id = catchDiv.getAttribute("catch-id");

    let angler = catchDiv.querySelector(".angler").value;
    let weight = catchDiv.querySelector(".weight").value;
    let species = catchDiv.querySelector(".species").value;
    let location = catchDiv.querySelector(".location").value;
    let bait = catchDiv.querySelector(".bait").value;
    let captureTime = catchDiv.querySelector(".captureTime").value;

    let dataToSend = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    }
    let token = sessionStorage.getItem("accessToken")
    try{
        let response = await fetch(`http://localhost:3030/data/catches/${catch_id}`,{
            method:"put",
            headers: {
                "Content-type" : "application/json",
                "X-authorization" : token
            },
            body: JSON.stringify(dataToSend)
        }
        )

        if(response.ok != true){
            let error = await response.json();
            throw new Error(error.message);
        }
        loadCatch();

    }
    catch(error){
        alert(error.message)
    }

}

async function deleteCatch(target){
    let catchDiv = target.parentElement;
    let catch_id = catchDiv.getAttribute("catch-id");
    let token = sessionStorage.getItem("accessToken");
    let response = await fetch(`http://localhost:3030/data/catches/${catch_id}`, {
        method:"Delete",
        headers:{
            "X-authorization" : token
        }
    })
    if(response.ok != true){
        let error = await response.json();
        throw new Error(error.message);
    }
    loadCatch();

}





function createCatch(angler,weight,species,location,bait,captureTime,data_id){
    let catcheDiv = document.createElement("div");
    catcheDiv.classList = "catch";

    let anglerNameLabel = document.createElement("label");
    anglerNameLabel.textContent = "Angler";
    catcheDiv.appendChild(anglerNameLabel);

    let anglerNameInput = document.createElement("input");
    anglerNameInput.value = angler;
    anglerNameInput.classList = "angler";
    catcheDiv.appendChild(anglerNameInput);

    let weightLabel = document.createElement("label");
    weightLabel.textContent = "Weight";
    catcheDiv.appendChild(weightLabel);

    let weightInput = document.createElement("input");
    weightInput.value = weight;
    weightInput.classList = "weight";
    catcheDiv.appendChild(weightInput);

    let speciesLabel = document.createElement("label");
    speciesLabel.textContent = "Species";
    catcheDiv.appendChild(speciesLabel);

    let speciesInput = document.createElement("input");
    speciesInput.value = species;
    speciesInput.classList = "species";
    catcheDiv.appendChild(speciesInput);

    let locationlabel = document.createElement("label");
    locationlabel.textContent = "Location";
    catcheDiv.appendChild(locationlabel);

    let locationInput = document.createElement("input");
    locationInput.value = location;
    locationInput.classList = "location";
    catcheDiv.appendChild(locationInput);

    let baitLabel = document.createElement("label");
    baitLabel.textContent = "Bait";
    catcheDiv.appendChild(baitLabel);

    let baitInput = document.createElement("input");
    baitInput.value = bait;
    baitInput.classList = "bait";
    catcheDiv.appendChild(baitInput);

    let captureTimeLabel = document.createElement("label");
    captureTimeLabel.textContent = "Capture Time";
    catcheDiv.appendChild(captureTimeLabel);

    let capTimeInput = document.createElement("input");
    capTimeInput.value = captureTime;
    capTimeInput.classList = "captureTime";
    catcheDiv.appendChild(capTimeInput);

    let updateButton = document.createElement("button");
    updateButton.classList = "update";
    updateButton.setAttribute("data-id",data_id);
    updateButton.textContent = "Update";
    catcheDiv.appendChild(updateButton);

    let deleteButton = document.createElement("button");
    deleteButton.classList = "delete";
    deleteButton.setAttribute("data-id",data_id);
    deleteButton.textContent = "Delete";
    catcheDiv.appendChild(deleteButton);


    return catcheDiv;

    




}
























function isLoged(){
    let username = sessionStorage.getItem("email");
    if(username){
        document.querySelectorAll(".catch").forEach(x => {
            if(x.id != sessionStorage.getItem("id")){
                x.querySelectorAll("button").forEach(x => x.disabled = true)
            }
        })
        addButton.disabled = false;
        homeButton.style.display = "inline";
        logoutButton.style.display = "inline";
        loginButton.style.display = "none";
        registerButton.style.display = "none";
        mainsField.style.display = "inline";
        greetingSpan.textContent = sessionStorage.getItem("email");
        
    }
    else{
        addButton.disabled = true; 
        homeButton.style.display = "inline";
        logoutButton.style.display = "none";
        loginButton.style.display = "inline";
        registerButton.style.display = "inline";
        mainsField.style.display = "none";
        greetingSpan.textContent = "guest";
    }
}


async function logout(){

    let request = await fetch(`http://localhost:3030/users/logout/${sessionStorage.getItem("email")}`,{
        method:"post",
        headers:{
            "Content-type" : "application/json"
        },
        body: JSON.stringify(sessionStorage.getItem("email"))
    });

    let response = await request;

    sessionStorage.clear();
    isLoged();
}

