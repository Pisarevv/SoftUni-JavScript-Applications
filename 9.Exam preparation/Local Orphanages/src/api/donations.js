import * as api from '../api/api.js';

export async function getDonatesCount(postId){
    let result = await api.get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
    return result;
}

export async function checkIfDonated(postId,userId){
    let result = await api.get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}

export async function makeDonation(postId){
    await api.post('/data/donations',{postId});
}