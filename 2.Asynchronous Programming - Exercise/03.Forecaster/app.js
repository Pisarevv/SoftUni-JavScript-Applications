function attachEvents() {
    let getWeatherButton = document.getElementById("submit");


    let forecastDiv = document.getElementById("forecast");
    let currentConditionsDiv = document.getElementById("current");
    let upcomingConditionsDiv = document.getElementById("upcoming")

    let weatherSymbols = {
        Sunny: "&#x2600;",
        PartlySunny: "&#x26C5;",
        Overcast: "&#x2601;",
        Rain: "&#x2614;",
        Degrees: "&#176;"

    }

    let url = "http://localhost:3030/jsonstore/forecaster/locations";

    getWeatherButton.addEventListener('click', getData);

    function getData() {
        fetch(url)
            .then(result => result.json())
            .then(data => {
                let inputLocation = document.getElementById("location").value;

                let desiredLocation = data.filter(x => x.name == inputLocation);
                let { code } = desiredLocation[0];

                fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
                    .then(result => result.json())
                    .then(data => {

                        forecastDiv.style.display = "block";

                        let newDiv = document.createElement('div');
                        newDiv.className = "forecasts";

                        let symbolSpan = document.createElement("span");
                        symbolSpan.className = "condition symbol";
                        switch (data.forecast.condition) {
                            case "Sunny": {
                                symbolSpan.innerHTML = weatherSymbols.Sunny;
                                break;
                            }
                            case "Partly sunny": {
                                symbolSpan.innerHTML = weatherSymbols.PartlySunny;
                                break;
                            }
                            case "Overcast": {
                                symbolSpan.innerHTML = weatherSymbols.Overcast;
                                break;
                            }
                            case "Rain": {
                                symbolSpan.innerHTML = weatherSymbols.Rain;
                                break;
                            }
                        };
                        newDiv.appendChild(symbolSpan);

                        let conditionsSpan = document.createElement("span");
                        conditionsSpan.className = "condition";
                        newDiv.appendChild(conditionsSpan);

                        let locationSpan = document.createElement("span");
                        locationSpan.className = "forecast-data"
                        locationSpan.textContent = data.name;
                        conditionsSpan.appendChild(locationSpan);

                        let temperatureSpan = document.createElement("span");
                        temperatureSpan.className = "forecast-data"
                        temperatureSpan.innerHTML = `${data.forecast.low}${weatherSymbols.Degrees}/${data.forecast.high}${weatherSymbols.Degrees}`;
                        conditionsSpan.appendChild(temperatureSpan);

                        let typeConditionSpan = document.createElement("span");
                        typeConditionSpan.className = "forecast-data";
                        typeConditionSpan.textContent = `${data.forecast.condition}`;
                        conditionsSpan.appendChild(typeConditionSpan);

                        currentConditionsDiv.appendChild(newDiv);


                        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                            .then(request => request.json())
                            .then(data => {

                                for (let currData of data.forecast) {

                                    let newDiv = document.createElement('div');
                                    newDiv.className = "forecast-info";

                                    let symbolSpan = document.createElement("span");
                                    symbolSpan.className = "symbol";
                                    switch (currData.condition) {
                                        case "Sunny": {
                                            symbolSpan.innerHTML = weatherSymbols.Sunny;
                                            break;
                                        }
                                        case "Partly sunny": {
                                            symbolSpan.innerHTML = weatherSymbols.PartlySunny;
                                            break;
                                        }
                                        case "Overcast": {
                                            symbolSpan.innerHTML = weatherSymbols.Overcast;
                                            break;
                                        }
                                        case "Rain": {
                                            symbolSpan.innerHTML = weatherSymbols.Rain;
                                            break;
                                        }
                                    };
                                    newDiv.appendChild(symbolSpan);

                                    let temperatureSpan = document.createElement("span");
                                    temperatureSpan.className = "forecast-data"
                                    temperatureSpan.innerHTML = `${currData.low}${weatherSymbols.Degrees}/${currData.high}${weatherSymbols.Degrees}`;
                                    newDiv.appendChild(temperatureSpan);

                                    let typeConditionSpan = document.createElement("span");
                                    typeConditionSpan.className = "forecast-data";
                                    typeConditionSpan.textContent = `${currData.condition}`;
                                    newDiv.appendChild(typeConditionSpan);

                                    upcomingConditionsDiv.appendChild(newDiv);

                                }



                            })





                    })
            }).catch(error => {
                forecastDiv.innerHTML = "";
                forecastDiv.style.display = "block";
                forecastDiv.textContent = "Error";
            })
    }

}

attachEvents();