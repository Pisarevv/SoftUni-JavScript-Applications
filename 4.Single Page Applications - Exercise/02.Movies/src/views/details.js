import * as api from '../api/api.js';
const detailsTarget = '/data/movies/';
let section = document.querySelector('#movie-example');
section.addEventListener('click', onClick)
section.remove();
section.className = "view-section";
section.id = "movieDetails";

let user = JSON.parse(localStorage.getItem('user'));

let ctx = null;
let currentId = null;
export async function showDetails(context,id){
    currentId = id;
    ctx = context;
    let detailsData = await api.get(detailsTarget+id);
    let movieLikes = await api.get(`/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);


    let detailsFragment = document.createDocumentFragment();
    detailsFragment.appendChild(generateDetails(detailsData,movieLikes,user));
    section.replaceChildren(detailsFragment);
    ctx.showSection(section);

}

async function onClick(e){
    e.preventDefault();
    let url = new URL (e.target.href)
    if(e.target.textContent == "Like" || e.target.getAttribute("disabled")==true){
        let result = await api.post('/data/likes',{currentId});
        e.target.setAttribute('disabled',true);
    }
}





function generateDetails(data,movieLikes,user){
     let div = document.createElement('div');
     div.className = "container";
    
     let movieDiv = document.createElement('div');
     movieDiv.className = "row bg-light text-dark";
     div.appendChild(movieDiv);
     movieDiv.innerHTML = `
     <h1>Movie title: ${data.title}</h1>

     <div class="col-md-8">
       <img
         class="img-thumbnail"
         src="${data.img}"
         alt="Movie"
       />
     </div>
     <div class="col-md-4 text-center">
       <h3 class="my-3">Movie Description</h3>
       <p>
         ${data.description}
       </p>`;

       if(user._id == data._ownerId){
        movieDiv.innerHTML += `
              <a class="btn btn-danger" href="#">Delete</a>
              <a class="btn btn-warning" href="#">Edit</a>
              <span class="enrolled-span">Liked ${movieLikes}</span>
              </div>`;           
       }
       else{
        movieDiv.innerHTML += `
              <a class="btn btn-primary" href="#">Like</a>
              </div>`;          
       }

       return  div;


}

/*
<section id="movie-example" class="view-section">
        <div class="container">
          <div class="row bg-light text-dark">
            <h1>Movie title: Black Widow</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                Natasha Romanoff aka Black Widow confronts the darker parts of
                her ledger when a dangerous conspiracy with ties to her past
                arises. Comes on the screens 2020.
              </p>
              <a class="btn btn-danger" href="#">Delete</a>
              <a class="btn btn-warning" href="#">Edit</a>
              <a class="btn btn-primary" href="#">Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
          </div>
        </div>
      </section>
      */