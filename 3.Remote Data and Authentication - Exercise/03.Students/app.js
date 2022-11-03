function solve(){
    window.addEventListener('load', loadStudents);
    let url = "http://localhost:3030/jsonstore/collections/students";
    let studentsTable = document.querySelector("#results");

    let submitButton = document.querySelector("#submit");
    submitButton.addEventListener('click', createStudent);
    let form = document.querySelector("#form");

    
    

    async function createStudent(e){
       try {
        e.preventDefault();
        let formData = new FormData(form);

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let facultyNumber = formData.get("facultyNumber");
        let grade = Number(formData.get("grade"));

        if(firstName == "" || lastName == "" || facultyNumber =="" || grade =="" || typeof(grade) != "number"){
            throw new Error("Invalid data inserted");
        }

        let student = {
            firstName,
            lastName,
            facultyNumber,
            grade
        }

        let request = await fetch (url,{
            method: "post",
            headers: {
                "Content-type" : "application/json"
            },
            body: (JSON.stringify(student))
        });

        if (request.ok == false) {
            let error = await request.json();
            throw new Error(error.message);
        }
        form.reset();

        loadStudents();

       }
        catch (error) {
        alert(error.message);
       }
    }




    async function loadStudents(){

        try {
            let request = await fetch(url);

            if (request.ok == false) {
                let error = await request.json();
                throw new Error(error.message);
            }

            let data = await request.json();
            studentsTable.innerHTML = "";

            for(let student of Object.values(data)){
                let createdStudent = createElement("tr",
                createElement("td",student.firstName),
                createElement("td",student.lastName),
                createElement("td",student.facultyNumber),
                createElement("td",Number(student.grade)));
                createdStudent.id = student._id;

                studentsTable.appendChild(createdStudent);

            }
            
        } 
        catch (error) {
            
        }

    }



    function createElement(type,...content){
        let element = document.createElement(type);

        content.forEach( c => {
            if(typeof c === "string" || typeof c === "number"){
                c = document.createTextNode(c);
            }
            element.appendChild(c);
        })

        return element;

    }

}



solve();