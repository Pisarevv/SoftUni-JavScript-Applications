function solution() {

    let mainSection = document.getElementById("main");
    getArticles();

    async function getArticles(){
        let url = "http://localhost:3030/jsonstore/advanced/articles/list";

        let result = await fetch(url);
        let data = await result.json();

        for(let article of data){
            mainSection.innerHTML += `
            <div class="accordion">
            <div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}">More</button>
            </div>
            <div class="extra">
                <p></p>
            </div>
            </div>
            `
        }

        let buttons = document.getElementsByClassName("button");

        for(let button of buttons){
            button.addEventListener('click', showInfoOrHide);
        }
    }

    async function showInfoOrHide(e){

        if(e.target.textContent == "More"){
            fetchData(e.target.id);
        }
        else if (e.target.textContent == "Less"){
            let hiddenField = e.target.parentElement.parentElement.getElementsByClassName('extra')[0];
            hiddenField.style.display = "none";
            e.target.textContent = "More";
        }


        async function fetchData(target){
            let targetUrl = `http://localhost:3030/jsonstore/advanced/articles/details/`;
            let result = await fetch(`${targetUrl}${target}`);
            let data = await result.json();

            let hiddenField = e.target.parentElement.parentElement.getElementsByClassName('extra')[0];
            let childrenElement = hiddenField.children[0];
            childrenElement.textContent = data.content;
            hiddenField.style.display = "block";
            e.target.textContent = "Less";
        }

        

    }
}

solution();