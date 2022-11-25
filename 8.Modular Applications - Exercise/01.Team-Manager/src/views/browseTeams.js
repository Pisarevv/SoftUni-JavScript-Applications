import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllTeams } from "../api/data.js";



let browseTeamsTemplate = (teams,members, page, pages,ctx) => html`
<article class="pad-med">
    <h1>Team Browser</h1>
</article>

<article class="layout narrow">
    <div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
</article>


`


let teamTemplate = (data) => html`
<article id = ${data._id} class="layout">
    <img src=${data.logoUrl}class="team-logo left-col">
    <div class="tm-preview">
        <h2>${data.name}</h2>
        <p>${data.description}</p>
        <span class="details">5000 Members</span>
        <div><a href="#" class="action">See details</a></div>
    </div>
</article>`




export async function showTeams(ctx) {
    let teams = await getAllTeams();
    ctx.render(browseTeamsTemplate(teams.teams,teams.members,teams.pages,ctx));

}