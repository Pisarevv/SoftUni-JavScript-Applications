import {daysView} from "./src/dayView.js";
import {monthsView} from "./src/monthView.js";
import {yearsView} from "./src/yearView.js";

let searchMonths = {
    Jan: "1",
    Feb : "2",
    Mar : "3",
    Apr : "4",
    May : "5",
    Jun : "6",
    Jul : "7",
    Aug : "8",
    Sep : "9",
    Oct : "10",
    Nov : "11",
    Dec : "12"
}


function findYear(year){
    switch(year){
            case "2020":{
                monthsView("year-2020");
                break
            }
            case "2021":{
                monthsView("year-2021");
                break
            }
            case "2022":{
                monthsView("year-2022");
                break
            }
            case "2023":{
                monthsView("year-2023");
                break
            }
        }
    }


yearsView();

window.addEventListener('click', expandMonths);

window.addEventListener('click', backToYearsView);

window.addEventListener('click', backToMonthsView);

function backToYearsView(e){
    if(e.target.tagName == "CAPTION" && e.target.parentElement.parentElement.classList == "monthCalendar"){
        yearsView();
    }
}

function backToMonthsView(e){
    if(e.target.tagName == "CAPTION" && e.target.parentElement.parentElement.classList == "daysCalendar" ){
        let year = e.target.parentElement.parentElement.id;
        year = year.replace("month-","");
        year = year.slice(0,4);
        findYear(year);
        }
    }



function expandMonths(e){
    if(e.target.tagName == "TD" && e.target.classList == "day" && e.target.id.includes("year")){
    let target_id = e.target.id;  
    let year = e.target.textContent.trim();
    
    findYear(year);
    }
    
}

window.addEventListener('click', expandDays);

function expandDays(e){
    
    if(e.target.tagName == "TD" && e.target.classList == "day" && !e.target.id.includes("year") && 
    e.target.parentElement.parentElement.parentElement.parentElement.classList != "daysCalendar"){
        let year = document.querySelector("section").id.replace("year-","");
        let month = e.target.children[0].textContent;

        let searchString = `month-${year}-${searchMonths[month]}`;
        daysView(searchString);
        
    }
}