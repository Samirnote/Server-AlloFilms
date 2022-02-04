require("dotenv").config();
require("./../config/dbConfig"); // fetch the db connection
const FilmModel = require('./../models/Film.model.js');
const axios = require('axios');

const filmsInfos = require('./simple.json');
let counter = 0
let intervalId = setInterval(() =>{
    if (counter === filmsInfos.length - 1) {
        clearInterval(intervalId);
        console.log('Finished...')
        process.exit()
    }
    fetchApi(counter)
    counter++
}, 100)

async function fetchApi(counter) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${filmsInfos[counter].id}?api_key=f59dd0e5ecfa450f4c799f1c056451a6&language=en-US&append_to_response=credits,videos`)
        const currentFilm = response.data
        const newFilm = {
            name: currentFilm.original_title,
            releaseDate: currentFilm.release_date,
            picture: `https://www.themoviedb.org/t/p/w1280${currentFilm.poster_path}`,
            description: currentFilm.overview,
            genre: currentFilm.genres[0]?.name || 'uncategorized',
            crew: currentFilm.credits.crew,
            cast: currentFilm.credits.cast,
            videos: currentFilm.videos.results
        }
await FilmModel.create(newFilm)
console.log(newFilm.name + ' inserted in the DB.');
    } catch(e) {
        console.log(e)
    }
}