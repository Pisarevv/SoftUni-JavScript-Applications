import { html } from "../lib.js";
import { getById, updateObject } from "../api/data.js";
import { CreateSubmitHander } from "../util.js";



let editTemplate = (data, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit = ${onEdit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" .value = ${data.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url"  .value = ${data.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category"  .value = ${data.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50">${data.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50">${data.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary"  .value = ${data.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function showEdit(ctx){
    let id = ctx.params.id;
    let data = await getById(id);
    ctx.render(editTemplate(data,CreateSubmitHander(ctx,onEdit)));

    async function onEdit(ctx,data,event){
        if(Object.values(data).some(x => x=="")){
            alert("All fields are required!");
            return;
        }
        await updateObject(id,data);
        ctx.page.redirect('/catalog/' + id);
    }
}

