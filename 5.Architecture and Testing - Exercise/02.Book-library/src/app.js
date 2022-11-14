import { showMain } from './mainView.js';
import { showEdit } from './editView.js';
import { createBooks } from './utilities.js';
import  * as api from './api.js'

showMain();
let sections = {
    "main" : showMain,
    "edit" : showEdit
}


let loadButton = document.querySelector("#loadBooks");
loadButton.addEventListener('click', loadBooks);

let submitButton = document.querySelector("#create");
submitButton.addEventListener('click',createBook)


let tableBody = document.querySelector("table tbody");


document.querySelector("body").addEventListener('click', editBook)
document.querySelector("body").addEventListener('click', deletBook)


function deletBook(e){
    if(e.target.tagName != "BUTTON" || e.target.textContent != "Delete"){
        return;
    }
    let id = e.target.parentElement.parentElement.id;
    api.delete(`collections/books/${id}`);

    loadBooks();
    showMain();
}



function editBook(e){
    if(e.target.tagName != "BUTTON" || e.target.textContent != "Edit"){
        return;
    }
    showEdit();

    let title = e.target.parentElement.parentElement.children[1].textContent;
    let author = e.target.parentElement.parentElement.children[0].textContent;
    let id = e.target.parentElement.parentElement.id;

    document.querySelector('#editForm [name="title"]').value = title;
    document.querySelector('#editForm [name="author"]').value = author;


    
    let saveButton = document.querySelector("#edit");
    saveButton.addEventListener("click", editCurrBook)

    function editCurrBook(e){
        e.preventDefault();
        let title =  document.querySelector('#editForm [name="title"]').value;
        let author = document.querySelector('#editForm [name="author"]').value;
        let dataToSend = {
            title,
            author
        }

        api.put(`collections/books/${id}`,dataToSend);
        loadBooks();
        showMain();


    }
    

}


async function loadBooks(e){
    let books = await api.get("collections/books");
    let createdBooks = createBooks(books);
    tableBody.replaceChildren(createdBooks);

}

async function createBook(e){
    e.preventDefault();
    let createForm = document.querySelector("#createForm");
    let formData = new FormData(createForm);
    let objects = Object.fromEntries([...formData.entries()]);
    createForm.reset();
    
    let response = await api.post("collections/books",objects);
    console.log(response)
    loadBooks();
    showMain();

}

