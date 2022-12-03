import { getById, updateObject } from "../api/data.js";
import { html } from "../lib.js";
import { CreateSubmitHander } from "../util.js";


let editTemplate = (data,onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form @submit = ${onEdit} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value = ${data.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" value = ${data.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value = ${data.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" value = ${data.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" value = ${data.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value = ${data.sales} />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function showEdit(ctx){
    let id = ctx.params.id;
    let albumDetails = await getById(id);
    ctx.render(editTemplate(albumDetails,CreateSubmitHander(ctx,onEdit)));

    async function onEdit(ctx,data,event){
        if (Object.values(data).some(x => x == "")) {
            alert("All fields are required!");
            return;
        }
        await updateObject(id,data);
        ctx.page.redirect("/catalog/" + id);
    }
}

