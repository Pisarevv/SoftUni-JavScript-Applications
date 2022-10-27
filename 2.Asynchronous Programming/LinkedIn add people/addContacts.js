import * as fetch from 'node-fetch';
globalThis.fetch = fetch
const reader = require('xlsx');

let linkedIns = [];

let excelFile = reader.readFile('Events.xlsx');
let targetsheet = excelFile.SheetNames[0];
let worksheet = excelFile.Sheets[targetsheet];
let addressOfCell = 'LinkedIn';
const columnName = Object.keys(worksheet).find(key=> worksheet[key].v === addressOfCell);




for (let key in worksheet) {
    if (key.toString()[0] === columnName[0]) {
        linkedIns.push(worksheet[key].v);
    }
  }

linkedIns = linkedIns.filter(item => item !== 'LinkedIn');

    async function addUsers() {
        try{
            let url = linkedIns[0];
    
            let profile = await fetch(url);
            let result = await profile.json();

        }
        catch(err){
            console.log(err)
        }
       
    
    }
    


addUsers();
