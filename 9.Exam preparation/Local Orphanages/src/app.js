import {page} from "./lib.js"
import { updateNav } from "./middleware/navbar.js";
import { DecorateContext } from "./middleware/render.js";
import { setSession } from "./middleware/session.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showLogin } from "./views/login.js";
import { onLogout } from "./views/logout.js";
import { showMyPosts } from "./views/myPosts.js";
import { showRegister } from "./views/register.js";


page(setSession);
page(updateNav);
page(DecorateContext);

page('/', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', onLogout);
page('/create', showCreate);
page('/edit/:id', showEdit);
page('/myPosts', showMyPosts)
page('/:id', showDetails);
page.start();

