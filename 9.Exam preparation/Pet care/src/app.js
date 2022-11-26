import { logout } from "./api/user.js";
import {page} from "./lib.js"
import { updateNav } from "./middleware/navbar.js";
import { decorateContext } from "./middleware/render.js";
import { setSession } from "./middleware/sesison.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";



page(setSession);
page(updateNav);
page(decorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);


let logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', onLogout);
page.start();



function onLogout(){
    logout();
    page.redirect("/");
}