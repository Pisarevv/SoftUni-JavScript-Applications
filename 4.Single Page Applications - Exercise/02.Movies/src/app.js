import {showHome} from './views/home.js';
import {showAddMovie} from './views/addMovie.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showRegister } from './views/register.js';
import { showLogin } from './views/login.js';
import { initialize } from './views/router.js';

document.getElementById('views').remove();

let links = {
    '/home' : showHome,
    '/login' : showLogin,
    '/register' : showRegister,
    '/addMovie' : showAddMovie
}

let router = initialize(links);
router.goTo('/home');

router.updateNav();
