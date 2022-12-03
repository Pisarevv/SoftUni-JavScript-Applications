import { login } from "../api/user.js";
import { html } from "../lib.js";
import { CreateSubmitHander } from "../util.js";


let loginTemplate = (onLogin) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit = ${onLogin} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`;


export function showLogin(ctx){
    ctx.render(loginTemplate(CreateSubmitHander(ctx,onLogin)));

}

async function onLogin(ctx,data,target){
    if(Object.values(data).some(x => x == "")){
        alert("All fields are required!");
        return;
    }
    let {email,password} = data;
    await login(email,password);
    ctx.page.redirect('/catalog');

}