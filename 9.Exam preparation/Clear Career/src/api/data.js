import * as api from './api.js'


export async function getAll(){
    let result = await api.get('/data/offers?sortBy=_createdOn%20desc');
    return result;
}

export async function getById(id){
    let result = await api.get('/data/offers/'+ id);
    return result;
}

export async function deleteById(id){
    let result = await api.delete('/data/offers/'+ id);
    return result;
}

export async function create(data){
   let result = await api.post('/data/offers', data);
   return result;
}

export async function updateObject(id,data){
    let result = await api.put('/data/offers/'+id, data);
   return result;
}

export async function getByName(query){
    let result = await api.get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
    return result;
}