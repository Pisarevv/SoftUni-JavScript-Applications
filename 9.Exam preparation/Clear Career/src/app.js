import { logout } from "./api/user.js";
import {page} from "./lib.js"
import { updateNav } from "./middleware/navbar.js";
import { DecorateContext } from "./middleware/render.js";
import { setSession } from "./middleware/session.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

let logoutButton = document.getElementById("logoutBtn");
logoutButton.addEventListener('click', onLogout)

page(setSession);
page(updateNav);
page(DecorateContext);
page('/', showHome);
page('/login',showLogin);
page('/register',showRegister);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit)

page.start();

async function onLogout(){
    await logout();
    page.redirect('/'); 
}