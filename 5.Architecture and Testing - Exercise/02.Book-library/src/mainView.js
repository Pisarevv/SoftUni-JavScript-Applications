let section = document.getElementById("mainView")
section.remove();

export function showMain() {
    document.querySelector("main").replaceChildren(section);
}