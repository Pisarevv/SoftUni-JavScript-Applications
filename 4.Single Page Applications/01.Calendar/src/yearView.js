let section = document.querySelector(".yearsCalendar");
let documentBody = document.querySelector("body")
document.querySelectorAll(".yearsCalendar").forEach(s => s.remove());

export function yearsView(){
    documentBody.replaceChildren(section);
}