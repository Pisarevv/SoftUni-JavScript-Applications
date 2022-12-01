import * as api from './api.js'


export async function getAll(){
    let result = await api.get('/data/posts?sortBy=_createdOn%20desc');
    return result;
}

export async function getById(id){
    let result = await api.get('/data/posts/'+ id);
    return result;
}

export async function deleteById(id){
    let result = await api.delete('/data/posts/'+ id);
    return result;
}

export async function create(data){
   let result = await api.post('/data/posts', data);
   return result;
}

export async function updateObject(id,data){
    let result = await api.put('/data/posts/'+id, data);
   return result;
}

export async function getByName(userId){
    let result = await api.get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}