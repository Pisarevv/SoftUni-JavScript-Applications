import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../users.js';


let loginTemplate = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" @click = "${onClick}" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`

let context = null;

export function showLogin(ctx) {
    context = ctx;
    ctx.render(loginTemplate());
}


function onClick(e){
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email == "" || password == ""){
        alert("All fields are required");
    }

    else{
        login({email,password});
        context.page.redirect('/');
    }

}