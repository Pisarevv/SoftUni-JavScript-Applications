let commentsUrl = "comments";
import * as api from "./api.js";
let userCommentSection = document.querySelector(".comment");
export async function loadComments(target){

    let commentFragment = document.createDocumentFragment();

    let comments = await api.get(commentsUrl);
    for(let comment of Object.entries(comments)){
        if(comment[1].postId == target){
            commentFragment.appendChild(generateUserComment(comment[1]));
            
        }
    }
    userCommentSection.replaceChildren(commentFragment);



}


function generateUserComment(inputData){
    let element = document.createElement("div");
    element.innerHTML = `<div class="topic-name-wrapper">
    <div class="topic-name">
        <p><strong>${inputData.username}</strong> commented on <time>${inputData.createdTime}</time></p>
        <div class="post-content">
            <p>${inputData.postText}.</p>
        </div>
    </div>
</div>`;

return element;
}

