let section = document.querySelector("#edit-movie");
section.remove();

export function showEdit(context,id){
    context.showSection(section);
}