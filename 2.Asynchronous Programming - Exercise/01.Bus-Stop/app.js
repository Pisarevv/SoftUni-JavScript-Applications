function getInfo() {
    
    let stopName = document.getElementById("stopName");
    let avaiableBuses = document.getElementById("buses");

    let inputId = document.getElementById("stopId").value;

    let url = "http://localhost:3030/jsonstore/bus/businfo/";

    fetch(`${url}${inputId}`)
    .then(result => result.json())
    .then(data => {
        stopName.textContent = "";
        avaiableBuses.innerHTML = "";


        stopName.textContent = data.name;
        for(let bus of Object.entries(data.buses)){
            let li = document.createElement("li");
            li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            avaiableBuses.appendChild(li);
        }
    })
    .catch(error => {
        stopName.textContent = "";
        avaiableBuses.innerHTML = "";
        
        stopName.textContent = "Error";
    })
}