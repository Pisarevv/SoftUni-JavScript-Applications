
export function createBooks(data){

    let fragment = document.createDocumentFragment();
    for(let book of Object.entries(data)){
        let id = book[0];
        let bookInfo = book[1];
        let currBook = createElement("tr", createElement("td",bookInfo.author)
        ,createElement("td",bookInfo.title));
        currBook.id = id;
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        let buttonsTd = createElement("td", editButton,deleteButton);

        currBook.appendChild(buttonsTd);


        fragment.appendChild(currBook);
       
    }

    return fragment;

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


