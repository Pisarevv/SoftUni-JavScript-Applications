function attachEvents() {

    let url = "http://localhost:3030/jsonstore/messenger";
    let documentTextArea = document.querySelector("#messages");
    let inputNameField = document.querySelector('[name = "author"]');
    let inputMessageField = document.querySelector('[name = "content"]');

    let sendButton = document.querySelector("#submit");
    let refreshButton = document.querySelector("#refresh");

    refreshButton.addEventListener('click', getMessages);
    sendButton.addEventListener('click', sendMessage);



    async function getMessages(e) {

       try{
        let request = await fetch(url);

        if (request.ok == false) {
            let error = await request.json();
            throw new Error(error.message);
        }

        let data = await request.json();
        documentTextArea.innerHTML = "";
        for (let pair of Object.values(data)) {
            documentTextArea.textContent += `${pair.author}: ${pair.content}\n`


        }
        documentTextArea.textContent.trimEnd();
       }catch (error) {
        alert(error.message);
    }
       
    };

    async function sendMessage(e) {
        try {
            let name = inputNameField.value;
            let message = inputMessageField.value;

            let data = {
                author: name,
                content: message,
            };

            let result = await fetch(url, {
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body: (JSON.stringify(data))
            });

            if (result.ok == false) {
                let error = await request.json();
                throw new Error(error.message);
            }
            inputNameField.value = "";
            inputMessageField.value = "";
            getMessages();
        }
        catch (error) {
            alert(error.message);
        }

    }
}




attachEvents();