async function startUp() {

    let pageMain = document.getElementsByTagName("main")[0];

    let recipes = await loadRecepies();

    for(let recepie of Object.entries(recipes)){
        let informatiom = recepie[1];
        let article = createElements("article","preview","","");
        let titleDiv = createElements("div","title","","");
        let title = createElements("h2","",`${informatiom.name}`,`${informatiom._id}`);
        let pictureDiv = createElements("div","small",`<img src="${informatiom.img}">`,"","");

        article.appendChild(titleDiv);
        titleDiv.appendChild(title);
        article.appendChild(titleDiv);
        article.appendChild(pictureDiv);

        article.addEventListener('click', loadIngridients);

        pageMain.appendChild(article);

    }








}


async function loadRecepies() {
    try {
        let pullReceipesRequest = await fetch("http://localhost:3030/jsonstore/cookbook/recipes");
        if (pullReceipesRequest.status != 200) {
            throw new Error(`${pullReceipesRequest.statusText} ${pullReceipesRequest.status}`);
        }

        let results = await pullReceipesRequest.json();
        return results;

    }

    catch (error) {
        alert(error.message)
    }


};


async function loadIngridients(e){

    if(isClicked){
        return;
    }

    let requestor = e.currentTarget;
    let target = requestor.getElementsByTagName('h2')[0];
    try{
        let pullIngiridientsRequest = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${target.id}`);
        if (pullIngiridientsRequest.status != 200){
            throw new Error(`${pullReceipesRequest.statusText} ${pullReceipesRequest.status}`);
        }
        let results = await pullIngiridientsRequest.json();

        let isClicked = true;
        visualizeIngridients(requestor,results);


        


    }
    catch (error) {
        alert(error.message)
    }

}

function visualizeIngridients(requestor, recievedObject){

    while(requestor.lastElementChild){
        requestor.lastElementChild.remove();
    }

    let title = createElements("h2","",`${recievedObject.name}`,"");
    requestor.appendChild(title);

    let bandDiv = createElements("div", "band", "", "");
    requestor.appendChild(bandDiv);
    
    let thumbDiv = createElements("div", "thumb", `<img src="${recievedObject.img}">`, "");
    bandDiv.appendChild(thumbDiv);

    let ingredientsDiv = createElements("div", "ingredients", "", "");
    bandDiv.appendChild(ingredientsDiv);

    let ingridientsTitle = createElements("h3","","Ingredients:","");
    ingredientsDiv.appendChild(ingridientsTitle);

    let ingrideintsList = createElements("ul","","","");
    ingredientsDiv.appendChild(ingrideintsList);

    for(let ingridient of recievedObject.ingredients){
        let row = createElements("li","",`${ingridient}`,"");
        ingrideintsList.appendChild(row);
    }

    let descriptionDiv = createElements("div", "description", "", "");
    let preparationH3 = createElements("h3","","Preparation:", "");
    descriptionDiv.appendChild(preparationH3);

    for(let step of recievedObject.steps){
        let newP = createElements("p","",`${step}`,"");
        descriptionDiv.appendChild(newP);
    }

    requestor.appendChild(descriptionDiv);


     






}


function createElements(elementType, elClass, elContent, elId) {

    let element = document.createElement(elementType);
    if(elId != ""){
        element.setAttribute("id", elId);
    }
    if(elClass != ""){
        element.setAttribute("class", elClass);
    }
    element.innerHTML = elContent;

    return element;


}