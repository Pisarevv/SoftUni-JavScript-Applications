let section = document.querySelector("#form-sign-up");
section.remove();

export function showRegister(context){
    context.showSection(section);
}