import { getUser } from "../util.js";

export function setSession(ctx,next){
    ctx.user = getUser();
    next();
}