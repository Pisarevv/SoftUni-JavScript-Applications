import {render} from "../lib.js";

let root = document.querySelector("main")

function ctxRender(content){
    render(content,root);
}

function ctxRenderNav(content){
    render(content,document.querySelector("nav"));
}

export function DecorateContext(ctx,next){
    ctx.render = ctxRender;
    ctx.renderNav = ctxRenderNav;
    next();
}


