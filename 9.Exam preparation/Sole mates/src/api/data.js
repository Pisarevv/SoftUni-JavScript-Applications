import * as api from './api.js'


export async function getAll(){
    let result = await api.get('/data/shoes?sortBy=_createdOn%20desc');
    return result;
}

export async function getById(id){
    let result = await api.get('/data/shoes/'+ id);
    return result;
}

export async function deleteById(id){
    let result = await api.delete('/data/shoes/'+ id);
    return result;
}

export async function create(data){
   let result = await api.post('/data/shoes', data);
   return result;
}

export async function updateObject(id,data){
    let result = await api.put('/data/shoes/'+id, data);
   return result;
}

export async function getByName(query){
    let result = await api.get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
    return result;
}