let section = document.querySelector("#movie-example");
section.remove();

export function showDetails(context){
    context.showSection(section);
}