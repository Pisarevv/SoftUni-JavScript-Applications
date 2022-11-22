import page from './node_modules/page/page.mjs';
import {render} from './node_modules/lit-html/lit-html.js'
import { showDashboard } from './views/catalog.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { logout, update } from './users.js';
import { showCreate } from './views/create.js';
import { showMyFurniture } from './views/myFurniture.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';

let logoutButton = document.querySelector("#logoutBtn");
logoutButton.addEventListener('click', () => {
    logout();
});



//appStart
update();

page(decorateContext);
page('index.html', '/');
page('/', showDashboard);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/myfurniture', showMyFurniture)
page('/details/:id', showDetails)
page('/edit/:id',showEdit )

page.start()



function decorateContext(ctx,next){
    ctx.update = update;
    ctx.render = function(content) 
    {  
        render(content,document.querySelector(".container"))
    };
    next();
}
