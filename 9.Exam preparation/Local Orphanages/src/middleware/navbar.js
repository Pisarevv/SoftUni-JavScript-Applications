let userNav = [...document.querySelectorAll("#user")];
let guestNav = [...document.querySelectorAll("#guest")];


export function updateNav(ctx,next){
    let user = ctx.user;
    if(user){
        userNav.map(x => x.style.display = "inline");
        guestNav.map(x => x.style.display = "none");
    }
    else{
        userNav.map(x => x.style.display = "none");
        guestNav.map(x => x.style.display = "inline");
    }

    next();
}