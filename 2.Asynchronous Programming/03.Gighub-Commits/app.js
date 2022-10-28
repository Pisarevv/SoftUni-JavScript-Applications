function loadCommits() {
    
    let username = document.getElementById("username").value;
    let repo = document.getElementById("repo").value;

    let list = document.getElementById("commits");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }

    fetchRepoCommits();
    async function fetchRepoCommits(){
        
        try{
            
            let commits = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
            

            if(commits.status != 200){
                throw new Error(`${commits.statusText} ${commits.status}`);
            }

            let results = await commits.json();

            for(let result of results){

                let li = document.createElement('li');
                li.textContent = `${result.commit.author.name}: ${result.commit.message}`
                list.appendChild(li);


            }
            
        }
        catch(error){
            let li = document.createElement('li');
            li.textContent = error;
            list.appendChild(li);

        }
        
        
    }
}