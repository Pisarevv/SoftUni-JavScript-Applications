function attachEvents() {
    let loadButton = document.getElementById("btnLoadPosts");
    loadButton.addEventListener('click', loadPosts);
}

async function loadPosts(){
    let targetUrl = 'http://localhost:3030/jsonstore/blog/posts';

    let result = await fetch(targetUrl);
    let data = await result.json();

    for(let post of Object.values(data)){
        console.log(post);
    }

}

attachEvents();