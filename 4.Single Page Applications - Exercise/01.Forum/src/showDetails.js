import * as api from "./api.js";
import {loadComments} from "./loadComm.js";
import {createComment} from "./createComment.js"
let section = document.querySelector("#detailsView");
let main = document.querySelector("main");


window.addEventListener('click',  createNewComment)

let currentTarget = null;

export async function showDetailsPage(target){
    currentTarget = await  api.get(`posts/${target}`);
    let generatedSection = generateTopic(currentTarget);
    let comments = loadComments(target);
    

    main.replaceChildren(generatedSection);
}


function createNewComment(e){
    e.preventDefault();
    if(e.target.tagName == "BUTTON"){
        let commentForm = document.querySelector("form");
        let formData = new FormData(commentForm);
        let postData = Object.fromEntries([...formData.entries()]);
        postData.postId = currentTarget._id;
        postData.createdTime = new Date().toLocaleDateString();
        createComment(postData);
    }
}



function generateTopic(inputData){
    let element = document.createElement("div");
    element.innerHTML = ` 
    
    <div class="theme-content">
                <!-- theme-title  -->
                <div class="theme-title">
                    <div class="theme-name-wrapper">
                        <div class="theme-name">
                            <h2 id="details-title">${inputData.topicName}</h2>
                        </div>
                    </div>
                </div>

    <div class="comment">

    <!-- topic content -->
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span id="details-username">${inputData.username}</span> posted on <time id="details-time">${inputData.createdTime}</time></p>
    
        <p id="details-content" class="post-content">${inputData.postText}</p>
    </div>

    <div id="user-comment"> </div>
    
    <div class="answer-comment">
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>
</div>

</div>
</div>`
   return element;
}

