import * as api from './api.js';

const target = 'http://localhost:3030/data/catalog';

export async function getAllFurniture(){
    let furniture = await api.get(target);
    return furniture;
}


export async function createFurniture(data){
    let furniture = await api.post(target,data)
}


export async function getFurtitureDetails(id){
    let furniture = await api.get(target +`/${id}`);
    return furniture;
}

export async function updateFurniture(id,data){
    let furniture = await api.put(target + '/' + id,data)
}

export async function deleteFurniture(id){
    await api.delete(target + '/' + id)
}