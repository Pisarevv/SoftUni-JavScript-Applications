let userElements = [...document.querySelectorAll(".user")];
let guestElements = [...document.querySelectorAll(".guest")];


export function updateNav(ctx,next){


    if(ctx.user){
        userElements.map(x => x.style.display = "inline");
        guestElements.map(x => x.style.display = "none");
    }
    else{
        userElements.map(x => x.style.display = "none");
        guestElements.map(x => x.style.display = "inline");
    }

    next();

}