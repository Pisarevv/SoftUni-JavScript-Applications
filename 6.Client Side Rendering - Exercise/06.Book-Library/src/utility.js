import { html, render } from '../../node_modules/lit-html/lit-html.js';
import {until} from '../../node_modules/lit-html/directives/until.js'
import * as api from '../api.js'

export {
    html,
    render,
    until
}

export  function getBooks()
{
    return  api.get('/books');
}

export  function createBook(book){
    return  api.post('/books', book);
}

export  function updateBook(id,book){
    return  api.put('/books/' + id, book);
}

export  function deleteBook(id){
    return  api.delete('/books/'+id);
}
