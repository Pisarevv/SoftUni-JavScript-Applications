import { html, nothing, render } from '../node_modules/lit-html/lit-html.js';
import * as api from './api.js'
document.querySelector('#searchBtn').addEventListener('click', onClick);

let root = document.querySelector("tbody");
let searchField = document.querySelector("#searchField");
let data = await api.get('/table');
let studentsInfo = Object.values(data);

let studentTemplate = (students) => {
   return students.map(student =>  {
      return html` 
   <tr id =${student._id}>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
   </tr>`
   });
}
render(studentTemplate(studentsInfo),root)

   function onClick() {
      let searchValue = searchField.value;
      for(let student of studentsInfo){
         let objectValues = Object.values(student);
         for(let value of objectValues){
            if(value.includes(searchValue)){
               let currStd = document.getElementById(student._id);
               currStd.setAttribute('class', 'select');
               break;
            }
            else{
               let currStd = document.getElementById(student._id);
               currStd.removeAttribute('class')
            }
         }
      }
   }
