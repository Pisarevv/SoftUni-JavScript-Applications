function attachEvents() {
    let loadButton = document.getElementById("btnLoadPosts");
    loadButton.addEventListener('click', loadPosts);

    let viewButton = document.getElementById("btnViewPost");
    viewButton.addEventListener('click', showPost);

   
}

async function loadPosts(){
    let targetUrl = 'http://localhost:3030/jsonstore/blog/posts';
    let selectSection = document.getElementById("posts");
    try{
    let result = await fetch(targetUrl);
    if(result.ok != true){
        throw new Error("Error");
    }
    let data = await result.json();
    for(let post of Object.values(data)){
        let option = document.createElement("option");
        option.value  = `${post.id}`;
        option.text = post.title;

        selectSection.appendChild(option);  
    }

    }
    catch(error){
        alert(error);
    }

   
};

async function showPost(){
    let targetUrl = 'http://localhost:3030/jsonstore/blog/posts';
    let selectSectionValue = document.getElementById("posts").value;
    try{
        let result = await fetch(`${targetUrl}/${selectSectionValue}`);
        if(result.status != 200){
            throw new Error("Error");
        }
        let data = await result.json();
        
        document.getElementById("post-title").textContent = data.title;
        document.getElementById("post-body").textContent = data.body;
    
       
    
    
        let commentsUrl = `http://localhost:3030/jsonstore/blog/comments`;
        let commentsSection = document.getElementById("post-comments");
    
        commentsSection.innerHTML = "";
    
        let commentResult = await fetch(`${commentsUrl}`);
        let commentData = await commentResult.json();
    
        for(let comment of Object.values(commentData)){
            if(comment.postId == selectSectionValue){
                let li = document.createElement('li');
                li.textContent = comment.text;
                commentsSection.appendChild(li);
            }
        }
    
    }
    catch(error){
        alert(error);
    }
    
   

   
}

attachEvents();