import { logout } from "./api/user.js";
import {page} from "./lib.js"
import { updateNav } from "./middleware/navbar.js";
import { decorateContext } from "./middleware/render.js";
import { setSession } from "./middleware/sesison.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";



page(setSession);
page(updateNav);
page(decorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/catalog/:id',showDetails)
page('/create', showCreate)


let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', onLogout);
page.start();



function onLogout(){
    logout();
    page.redirect("/");
}