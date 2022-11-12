import {showHome} from "./showHome.js";

showHome();



let homeButton = document.querySelector("nav a");

homeButton.addEventListener('click', showHome)

