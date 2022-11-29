import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import { getAllTeams } from "../api/data.js";




let browseTeamsTemplate = (teams, page, pages) => html`
<article class="pad-med">
    <h1>Team Browser</h1>
</article>

<article class="layout narrow">
    <div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
</article>
${pager(page,pages)}
${teams.map(teamTemplate)}
`


let teamTemplate = (data) => html`
<article id = ${data._id} class="layout">
    <img src="../..${data.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${data.name}</h2>
        <p>${data.description}</p>
        <span class="details">5000 Members</span>
        <div><a href="#" class="action">See details</a></div>
    </div>
</article>`




export async function showTeams(ctx) {
    let query = parseQueryString(ctx.querystring); 
    let page = Number(query.page ) || 1;
    let {teams,pages} = await getAllTeams(page);
    ctx.render(browseTeamsTemplate(teams,page,pages,ctx));

}


export function parseQueryString(query = ""){
    return Object.fromEntries(query.split('&').map(kvp => kvp.split('=')));
}

let pager = (page,pages) => html`
<header class="section-title">
    Page ${page} of ${pages}
    ${page != 1 ? html`<a class="pager" href="/browseTeams?page=${page-1}">&lt;Previous</a>` : nothing};
    ${page < pages ? html`<a class="pager" href="/browseTeams?page=${page+1}">Next&gt;</a>` : nothing};
</header>`