import {render} from '../lib.js';

let root = document.querySelector("main");

function ctxRender(content) {
   return render(content,root)
}

export function decorateContext(ctx,next){
    ctx.render = ctxRender;
    next();

}

