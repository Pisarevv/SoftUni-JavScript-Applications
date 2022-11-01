document.querySelector("form").addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients').trim().split('\n');
    let steps = formData.get('steps').trim().split('\n');

    let recepie = {
        name,
        img,
        ingredients,
        steps
    };

    try {
        let request = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': `${sessionStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(recepie)
            

        });

        if (request.ok == false) {
            let error = await request.json();
            throw new Error(error.message);
        }

        console.log(await request.json());

        window.location = '/';


    }
    catch (error) {
        alert(error);
    }
}