function attachEvents() {

    let url = 'http://localhost:3030/jsonstore/phonebook';

    let phoneBookList = document.querySelector("#phonebook");
    let personField = document.querySelector("#person");
    let phoneField = document.querySelector("#phone");

    let loadButton = document.querySelector("#btnLoad", loadPhones);
    loadButton.addEventListener('click', loadPhones);

    let createButton = document.querySelector("#btnCreate");
    createButton.addEventListener('click', createContact);

    async function createContact() {
        try {
            let personName = personField.value;
            let phone = phoneField.value;

            if (personName == "" || personName == ""){
                throw new Error("Both person and phone fields need to be filled!");
            }
        
            let dataToSend = {
                person: personName,
                phone: phone
            }

            let request = fetch(url,{
                method: "post",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(dataToSend)
            });
            if (request.ok == false) {
                let error = await request.json();
                throw new Error(error.message);
            }

            loadPhones();
            
        }
        catch (error) {
            alert(error.message);
        }


    }

    async function loadPhones() {

        try {
            let request = await fetch(url);

            if (request.ok == false) {
                let error = await request.json();
                throw new Error(error.message);
            }

            let data = await request.json();
            phoneBookList.innerHTML = "";
            for (let pair of Object.values(data)) {
                let li = document.createElement("li");
                li.id = pair._id;
                li.textContent = `${pair.person}: ${pair.phone}`;
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener('click', deleteContact);
                li.appendChild(deleteButton);
                phoneBookList.appendChild(li);

            };


        }
        catch (error) {
            alert(error.message);
        }

    }

    async function deleteContact(e) {
        let targetId = e.target.parentElement.id;
        try {
            let request = await fetch(`${url}/${targetId}`, {
                method: "delete"
            });
            if (request.ok == false) {
                let error = await request.json();
                throw new Error(error.message);
            };

            loadPhones();

        }
        catch (error) {

        }

    }
}

attachEvents();