let section = document.getElementById("editView")
section.remove();

export function showEdit(){
    document.querySelector("main").replaceChildren(section);
}