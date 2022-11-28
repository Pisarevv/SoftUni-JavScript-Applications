import * as api from './api.js'

export async function offerApply(offerId){
   let result = await api.post('/data/applications',{offerId});
   return result;
}


export async function getAppCount(offerId){
   let result = await api.get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
   return result;
}

export async function checkCanApply(offerId,userId){
    let result = await api.get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}