function lockedProfile() {

    let pageMain = document.getElementById("main");
    pageMain.innerHTML = "";

    let targetUrl = 'http://localhost:3030/jsonstore/advanced/profiles';

    getUserInfo();


    async function getUserInfo(){

        try{
            let pullResult = await fetch(targetUrl);
            if(pullResult.status != 200){
                throw new Error("Error");
            }
            let i = 0;
            let data = await pullResult.json();
            for(let user of Object.entries(data)){
                let userInfo = user[1];
                pageMain.innerHTML += `
                <div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user${i}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user${i}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${i}Username" value="${userInfo.username}" disabled readonly />
				<div id ="user${i}HiddenFields">
					<hr>
					<label>Email:</label>
					<input type="email" name="user${i}Email" value="${userInfo.email}" disabled readonly />
					<label>Age:</label>
					<input type="text" name="user${i}Age" value="${userInfo.age}" disabled readonly />
				</div>
				
				<button>Show more</button>
			</div>`

            let currHidenDiv = document.getElementById(`user${i}HiddenFields`);
            currHidenDiv.style.display = "none";
            i++;

            }

            let buttons= document.getElementsByTagName("button");
            for(let button of buttons){
                button.addEventListener('click', showOrHideInfo);
            }
        


        }
        catch(error){

        }
    }

    function showOrHideInfo(e){
        let currentParent = e.target.parentElement;

        let locked = currentParent.children[2];
        let unlocked = currentParent.children[4];
        let button = currentParent.getElementsByTagName("button")[0];

        if(locked.checked){
            button.textContent = "Show more";
            currentParent.children[9].style.display = "none";
        }
        else if(unlocked.checked){
            button.textContent = "Hide it";
            currentParent.children[9].style.display = "block";
        }
        
    }
}