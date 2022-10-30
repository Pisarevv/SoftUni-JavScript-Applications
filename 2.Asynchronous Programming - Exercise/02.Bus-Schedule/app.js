function solve() {

    let url = "http://localhost:3030/jsonstore/bus/schedule/";
    let departButton = document.getElementById("depart");
    let arriveButton = document.getElementById("arrive");

    let outputSpan = document.querySelector(".info");

    let currentStop = {
        next : "depot"
    };

    function depart() {
        
    
        fetch(`${url}${currentStop.next}`)
        .then(result => result.json())
        .then(data => {
            currentStop = data;
            outputSpan.textContent = `Next stop ${data.name}`;
            departButton.disabled = true;
            arriveButton.disabled = false;
        })
        .catch(error => {
            departButton.disabled = true;
            arriveButton.disabled = true;
            outputSpan.textContent = "Error";
        })




    }

    function arrive() {

        outputSpan.textContent = `Arriving at ${currentStop.name}`;
        departButton.disabled = false;
        arriveButton.disabled = true;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();