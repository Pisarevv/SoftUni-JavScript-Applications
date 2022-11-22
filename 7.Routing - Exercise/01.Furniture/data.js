import * as api from './api.js';

const target = 'http://localhost:3030/data/catalog';

export async function getAllFurniture(){
    let furniture = await api.get(target);
    return await furniture;
}


export async function createFurniture(data){
    let furniture = await api.post(target,data)
}