import {showHome} from './views/home.js';
import {showAddMovie} from './views/addMovie.js';
import { showEdit } from './views/edit.js';
import { showRegister } from './views/register.js';
import { showLogin } from './views/login.js';
import { initialize } from './views/router.js';
import { logout } from './api/users.js';
document.getElementById('views').remove();

let links = {
    '/home' : showHome,
    '/login' : showLogin,
    '/register' : showRegister,
    '/addMovie' : showAddMovie,
    '/logout' : siteLogout,
}

let router = initialize(links);
router.goTo('/home');

router.updateNav();


function siteLogout(e){
    logout();
    router.updateNav();
    router.goTo('/home');

}