import { logout } from "../api/user.js";

export function onLogout(ctx){
    logout();
    ctx.page.redirect("/catalog");
}