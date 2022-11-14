let section = document.querySelector("#add-movie");
section.remove();

export function showAddMovie(context){
    context.showSection(section);
}