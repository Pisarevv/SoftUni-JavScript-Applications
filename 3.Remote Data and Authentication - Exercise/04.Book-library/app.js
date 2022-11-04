function solve(){

    let url = "http://localhost:3030/jsonstore/collections/books";

    let siteBody = document.querySelector("body");
    createEditForm();

    let tableBody = document.querySelector("table tbody");
    let createBookForm = document.querySelector("form");
    createBookForm.id = "createBookForm";
    let loadBooksButton = document.querySelector("button");
    loadBooksButton.id = "load";
    loadBooksButton.addEventListener('click', loadBooks);

    let submitButton = document.querySelector("form#createBookForm button");
    submitButton.addEventListener('click',createBook);

    


    async function createBook(e){
        e.preventDefault();
        try {
            let formData = new FormData(createBookForm);
            let title = formData.get("title");
            let author = formData.get("author");

            let request = await fetch(url,{
                method:"post",
                headers:{
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    author,
                    title
                })
            });

            if(request.ok == false){
                let error = await request.json();
                throw new Error(error);
            }
            loadBooks();

        }
         catch (error) {
            alert(error.message)
        }




    }




    async function loadBooks(e){
        try {
            let request = await fetch(url);
        
            if(request.ok == false){
                let error = await request.json();
                throw new Error(error);
            }

            let data = await request.json();
            tableBody.innerHTML = "";
            for(let book of Object.entries(data)){
                let id = book[0];
                let bookInfo = book[1];
                let currBook = createElement("tr", createElement("td",bookInfo.author)
                ,createElement("td",bookInfo.title));
                currBook.id = id;

                let editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.addEventListener('click', editBook)

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener('click', deleteBook);

                let buttonsTd = createElement("td", editButton,deleteButton);

                currBook.appendChild(buttonsTd);


                tableBody.appendChild(currBook);
               


            }
    
        }
         catch (error) {
            alert(error.message)
        }
    
    }

    async function editBook(e){
        try{
            e.preventDefault();
            let editBookForm = document.querySelector("#editBookForm");

            createBookForm.style.display = "none";
            editBookForm.style.display = "block";

            let currentRow = e.target.parentElement.parentElement;

            let bookId = e.target.parentElement.parentElement.id;
            let title = currentRow.children[0].textContent;
            let author = currentRow.children[1].textContent;

            let inputs =  document.querySelectorAll("form#editBookForm input");
            inputs[0].value = author;
            inputs[1].value = title;

            let saveButton = editBookForm.querySelector("button");
            saveButton.addEventListener('click', saveEdit);
            
        }
        catch(error){
            alert(error.message)
        }

    }


    async function saveEdit(e){
        e.preventDefault();
        let editBookForm = document.querySelector("#editBookForm");
        let bookId = e.target.parentElement.parentElement.id;

        try {
        let formData = new FormData(editBookForm);

        let title = formData.get("title");
        let author = formData.get("author");

        let request = await fetch(`${url}/${bookId}`,{
            method:"put",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                author,
                title
            })
        });

        if(request.ok == false){
            let error = await request.json();
            throw new Error(error);
        }

        createBookForm.style.display = "none";
        editBookForm.style.display = "block";
        } 
        catch(error){
            alert(error.message)
        }
    }

    async function deleteBook(e){
        let bookId = e.target.parentElement.parentElement.id;

        try{
            let request = await fetch(`${url}/${bookId}`,{
                method:"delete"
              
            });
    
            if(request.ok == false){
                let error = await request.json();
                throw new Error(error);
            }

            loadBooks();



            } 
        catch(error){
            alert(error.message)
        }

    }



    function createElement(type,...content){
        let element = document.createElement(type);

        content.forEach(c => {
            if(typeof c === "string" || typeof c === "number" ){
                c = document.createTextNode(c);
            }
            element.appendChild(c);
        })

        return element;
    }

    function createEditForm(){
        let editForm = document.createElement("form");
        editForm.id = "editBookForm";

        let h3 = document.createElement("h3");
        h3.textContent = "Edit FORM";
        editForm.appendChild(h3);

        let titleLabel = document.createElement("label");
        titleLabel.textContent = "TITLE";
        editForm.appendChild(titleLabel);
        
        let titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.name = "title";
        editForm.appendChild(titleInput);

        let authorLabel  = document.createElement("label");
        authorLabel.textContent = "AUTHOR";
        editForm.appendChild(authorLabel);

        let authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.name = "author";
        editForm.appendChild(authorInput);

        let editButton = document.createElement("button");
        editButton.textContent = "Save";
        editButton.addEventListener('click',editBook);

        editForm.appendChild(editButton);

        editForm.style.display = "none";
        siteBody.appendChild(editForm);

    }
}


solve();