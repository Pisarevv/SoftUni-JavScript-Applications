import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/user.js";
import { updateNav } from "../middleware/navbar.js";
import { createSubmitHandler } from "../util.js";


let loginTemplate = (onSubmit) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit = ${onSubmit} id="login-form" class="main-form pad-large">
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>

`

export function showLogin(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}



async function onSubmit(ctx,data,event){
    await login(data.email,data.password);
    ctx.page.redirect('/home');
    
}