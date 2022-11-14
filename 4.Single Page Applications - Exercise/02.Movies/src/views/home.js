let section = document.querySelector("#home-page");
let addMovieButton = document.querySelector('#add-movie-button');
section.remove();

let ctx = null;
addMovieButton.addEventListener('click',onClick);  


export function showHome(context){
    ctx = context;
    context.showSection(section);
}


function onClick(e){
    e.preventDefault();
    ctx.goTo('addMovie');
}