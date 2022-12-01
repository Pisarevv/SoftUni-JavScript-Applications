import { getById, updateObject } from "../api/data.js";
import { html } from "../lib.js";
import { CreateSubmitHander } from "../util.js";




let editTemplate = (data,onEdit) => html`
<section id="edit-page" class="auth">
    <form @submit = ${onEdit} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" .value=${data.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" .value=${data.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" .value=${data.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" .value=${data.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" .value=${data.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>`

export async function showEdit(ctx) {
    let id = ctx.params.id;
    let data = await getById(id);
    ctx.render(editTemplate(data,CreateSubmitHander(ctx, onEdit)))

    async function onEdit(ctx, data, event) {
        if (Object.values(data).some(x => x == "")) {
            alert("All fiedls are required!");
            return;
        }
        await updateObject(id,data);
        ctx.page.redirect("/");
    }
}

