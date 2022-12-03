import * as api from './api.js'


export async function getAll(){
    let result = await api.get('/data/albums?sortBy=_createdOn%20desc');
    return result;
}

export async function getById(id){
    let result = await api.get('/data/albums/'+ id);
    return result;
}

export async function deleteById(id){
    let result = await api.delete('/data/albums/'+ id);
    return result;
}

export async function create(data){
   let result = await api.post('/data/albums', data);
   return result;
}

export async function updateObject(id,data){
    let result = await api.put('/data/albums/'+id, data);
   return result;
}

