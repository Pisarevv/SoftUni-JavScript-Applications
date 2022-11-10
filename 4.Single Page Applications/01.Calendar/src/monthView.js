let section = [...document.querySelectorAll(".monthCalendar")];
let documentBody = document.querySelector("body")
document.querySelectorAll(".monthCalendar").forEach(s => s.remove());

export function monthsView(year){
    let months = section.find(x => x.id == year);
    documentBody.replaceChildren(months)
}