require("dotenv").config();
require("./../config/dbConfig"); // fetch the db connection
const FilmModel = require('./../models/Film.model.js');
const axios = require('axios');

const filmsInfos = require('./simple.json');

for (let i = 3501; i < 3999; i++) {
    const film = filmsInfos[i];
    axios.get(`https://api.themoviedb.org/3/movie/${film.id}?api_key=f59dd0e5ecfa450f4c799f1c056451a6&language=en-US&append_to_response=credits,videos`)
        .then(response => {
            //console.log(response.data);
            const currentFilm = response.data;
            //console.log(currentFilm);
            const newFilm = {
                name: currentFilm.original_title, 
                releaseDate: currentFilm.release_date, 
                picture: `https://www.themoviedb.org/t/p/w1280${currentFilm.poster_path}`,
                description: currentFilm.overview, 
                genre: currentFilm.genres[0].name,
                crew : currentFilm.credits.crew,
                cast : currentFilm.credits.cast,
                videos : currentFilm.videos.results
            }
            FilmModel.create(newFilm)
                .then(response => {
                    console.log(response.name + ' inserted in the DB.');
                })
                .catch(error => console.error(error))
        })
        .catch((error) => console.error(error))

}