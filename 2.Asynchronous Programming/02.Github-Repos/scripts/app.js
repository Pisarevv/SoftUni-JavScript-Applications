function loadRepos() {

	let username = document.getElementById("username").value;
	let list = document.getElementById("repos");
    getRepos();
	async function getRepos(){
		try{
			let repos = await fetch(`https://api.github.com/users/${username}/repos`);
			if(repos.status != 200){
				throw new Error(`${repos.status} ${repos.statusText}`);
			}
			let result = await repos.json();

			for(let repo of result){
				let newLi = document.createElement('li');
				let newLink = document.createElement('a');
				newLink.textContent = repo.full_name;
				newLink.href = repo.html_url;
				newLi.appendChild(newLink);
				list.appendChild(newLi);

			}
			
			
		}
		catch(error){
			alert(error)
		}
		
		

	}
}