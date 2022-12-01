import { register } from "../api/user.js";
import { html } from "../lib.js";
import { CreateSubmitHander } from "../util.js";

let registerTemplate = (onRegister) => html`
<section id="register-page" class="auth">
    <form @submit = ${onRegister} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>`

export function showRegister(ctx) {
    ctx.render(registerTemplate(CreateSubmitHander(ctx,onRegister)));
}

async function onRegister(ctx, data, event) {
    if (Object.values(data).some(x => x == "")) {
        alert("All fiedls are required!");
        return;
    }
    let { email, password, repeatPassword } = data;
    if(password != repeatPassword){
        alert("Passwords don't match");
        return;
    }


    await register(email, password);
    ctx.page.redirect("/");
}