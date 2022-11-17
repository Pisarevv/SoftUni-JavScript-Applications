import * as api from './api.js';

const routes = {
    'movies' : '/data/movies',
    'likes' : '/data/likes'
}

export async function getMovies(){

    let recievedMovies = await api.get(routes.movies);
    return await recievedMovies;

}

