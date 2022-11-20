import { deleteBook, getBooks, until } from '../src/utility.js';
import { html } from '../src/utility.js';

 let catalogTemplate = (booksPromise) => 
    html`
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${until(booksPromise, html`<tr><td colspan = "3">Loading...</td></tr>`)}
           
        </tbody>
    </table>`;


let bookRow = (book, onEdit, onDelete) => html`
 <tr id = ${book._id}>
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>
         <button @click = ${onEdit}>Edit</button>
         <button @click = ${onDelete}>Delete</button>
     </td>
</tr>`;

let context = null;

export function showCatalog(ctx){
     context = ctx;
     return catalogTemplate(loadBooks());
}


async function loadBooks() {
    let data = await getBooks();

    let books = Object.entries(data).map(([k,v]) => Object.assign(v, {_id: k}));
    return Object.values(books).map(book =>bookRow(book,toggleEditor.bind(null,book), onDelete.bind(null,book._id)));
}


function toggleEditor(book) {
    context.book = book;
    context.update();
}


function onDelete(id){
    deleteBook(id);
    context.update();
}