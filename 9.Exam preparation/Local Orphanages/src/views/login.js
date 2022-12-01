import { login } from "../api/user.js";
import { html } from "../lib.js";
import { CreateSubmitHander } from "../util.js";

let loginTemplate = (onLogin) => html`
<section id="login-page" class="auth">
    <form @submit = ${onLogin} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>`

export function showLogin(ctx){
    ctx.render(loginTemplate(CreateSubmitHander(ctx,onLogin)));
}

async function onLogin(ctx,data,event){
    if(Object.values(data).some(x => x=="")){
        alert("All fiedls are required!");
        return;
    }
    let {email, password} = data;
    await login(email,password);
    ctx.page.redirect("/");
}