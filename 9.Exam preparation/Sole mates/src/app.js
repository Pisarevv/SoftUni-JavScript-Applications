import { logout } from "./api/user.js";
import {page} from "./lib.js"
import { updateNav } from "./middleware/navbar.js";
import { DecorateContext } from "./middleware/render.js";
import { setSession } from "./middleware/session.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

let logoutButton = document.querySelector("#logoutBtn");
logoutButton.addEventListener('click', onLogout)

page(setSession);
page(updateNav);
page(DecorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register',showRegister);


page.start();


function onLogout(){
    logout();
    page.redirect('/');
}