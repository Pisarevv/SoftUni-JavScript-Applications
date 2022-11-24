let userLinks = [...document.querySelectorAll(".user")];
let guestLinks = [...document.querySelectorAll(".guest")];


export function updateNav(ctx, next){
    if(ctx.user){
        guestLinks.map(l => l.style.display = "none");
        userLinks.map(l => l.style.display = "inline");
    }
    else{
        guestLinks.map(l => l.style.display = "inline");
        userLinks.map(l => l.style.display = "none");
    }
    next();
}