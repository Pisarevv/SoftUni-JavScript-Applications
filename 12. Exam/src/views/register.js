import { register } from "../api/user.js";
import { html } from "../lib.js";
import { CreateSubmitHander } from "../util.js";


let registerTemplate = (onRegister) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit = ${onRegister} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;


export function showRegister(ctx){
    ctx.render(registerTemplate(CreateSubmitHander(ctx,onRegister)));
}


async function onRegister(ctx,data,event){
    if(Object.values(data).some(x => x == "")){
        alert("All fields are required!");
        return;
    }
    if(data["password"] != data["re-password"]){
        alert("Passwords don't match");
        return;
    }
    let {email,password} = data;
    await register(email,password);
    ctx.page.redirect('/catalog');
}