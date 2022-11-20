import { createBook, html } from '../src/utility.js';

const createTemplate = () => 
    html`
    <form @submit = ${onSubmit} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>`;

let context = null;


export function showCreate(ctx){
    context = ctx; 
    if(ctx.book == undefined){
        return createTemplate();
    }
    else{
        return null;
    }
   
    
}


async function onSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);

    let title = formData.get('title');
    let author = formData.get('author');

    let result = await createBook({title,author});
    event.target.reset();
    context.update();
}
