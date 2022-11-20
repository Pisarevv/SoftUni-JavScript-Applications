import { html, updateBook } from '../src/utility.js';


let updateTemplate = (book) => 
    html` 
 <form @submit =${onSubmit} id="edit-form">
    <input type="hidden" name="id" .value=${book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>`;

let context = null;

export function showUpdate(ctx){
    context = ctx;
    if(ctx.book == undefined){
        return null;
    }
    else{
        return updateTemplate(ctx.book);
    }
   
}

async function onSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);

    let id = formData.get('id');
    let title = formData.get('title');
    let author = formData.get('author');

    await updateBook(id ,{title,author});
    event.target.reset();
    delete context.book;
    context.update();
}