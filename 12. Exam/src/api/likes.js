import * as api from "./api.js"

export async function likeAlbum(albumId){
    let result = await api.post("/data/likes", {albumId});
    return result;
}

export async function getLikesCount(albumId){
    let result = await api.get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
    return result;
}

export async function checkIfCanLike(albumId,userId){
    let result = await api.get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}