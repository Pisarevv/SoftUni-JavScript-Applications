import {render} from "../lib.js";

let root = document.querySelector("main")

function ctxRender(content){
    render(content,root);
}


export function DecorateContext(ctx,next){
    ctx.render = ctxRender;
    next();
}