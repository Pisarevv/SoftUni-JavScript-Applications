import {getMovies} from '../api/data.js';
import {showDetails} from './details.js';

let section = document.querySelector("#home-page");
let movieSection = document.querySelector("#movie");
movieSection.addEventListener('click', movieDetails);

let moviesList = section.querySelector("#movies-list");
let addMovieButton = document.querySelector('#add-movie-button');
section.remove();

let ctx = null;
addMovieButton.addEventListener('click',onClick);  


export function showHome(context){
    ctx = context;
    context.showSection(section);
    loadMovies();
}


function onClick(e){
    e.preventDefault();
    ctx.goTo('/addMovie');
}

function movieDetails(e){
    e.preventDefault();
    if(e.target.tagName == "BUTTON"){
        let movieId = e.target.parentElement.id;
        showDetails(ctx,movieId);
    }
}

async function loadMovies(){
    let request = getMovies();
    let movies = await request;

    let movieFragment = document.createDocumentFragment();
    for(let movie of Object.values(movies)){
        movieFragment.appendChild(generateMovies(movie));
    }  
    moviesList.replaceChildren(movieFragment);
    


}





function generateMovies(data){
    let ul = document.createElement("ul");
    ul.className = "card";
    ul.id = data._id;
   
    ul.setAttribute("ownerId",data._ownerId);

    let movieImg = document.createElement("img");
    movieImg.src = data.img;
    ul.appendChild(movieImg);

    let titlePar = document.createElement("p");
    titlePar.textContent = data.title;
    ul.appendChild(titlePar);

    let detailsButton = document.createElement('button');
    detailsButton.textContent = "Details";
    detailsButton.className = "enrolled-span btn-group ";
    ul.appendChild(detailsButton);

    return ul;

}