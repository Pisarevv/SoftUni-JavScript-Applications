let section = [...document.querySelectorAll(".daysCalendar")];
let documentBody = document.querySelector("body")
document.querySelectorAll(".daysCalendar").forEach(s => s.remove());

export function daysView(month){
    let days = section.find(x => x.id == month);
    documentBody.replaceChildren(days);

}
