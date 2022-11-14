let section = document.querySelector("#form-login");
section.remove();

export function showLogin(context){
    context.showSection(section);
}