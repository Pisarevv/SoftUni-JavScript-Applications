function loadLinkedIns(){
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
    console.log(linkedIns);
    
       /* async function addUsers() {
            try{
                //let url = linkedIns[0];
                let url = "https://docs.google.com/spreadsheets/d/1dydh88xv3-51zBFz1p3vHDGWdh9UCl45b0hxtLLNkAk/edit?fbclid=IwAR0_1vK-C-gikGR3hwTazgFbBKfWkSJjAxaQZozlc_KHwHh3jKMLwj-oBhU#gid=0";
        
                let profile = await fetch(url);
                let result = await profile.json();
    
            }
            catch(err){
                console.log(err)
            }
           
        
        }
        
    
    
    addUsers();*/
}



loadLinkedIns();