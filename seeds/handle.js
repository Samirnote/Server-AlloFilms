require("dotenv").config();
require("./../config/dbConfig"); // fetch the db connection
const FilmModel = require("./../models/Film.model.js");
const axios = require("axios");

const filmsInfos = require("./simple1.json");

let counter = 0;

const finish = () => {
 // clearInterval(intervalId);
  console.log("Finished...");
  process.exit();
};

let doRec = async  () => {
  try {
    if (counter === filmsInfos.length - 1) {
      finish();
    }
    await fetchApi(counter);
    counter++;
    setTimeout(doRec, 100);
  } catch (err) {
    console.log("err at interval", err);
    finish();
  }
};

 function fetchApi(counter) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${filmsInfos[counter].id}?api_key=f59dd0e5ecfa450f4c799f1c056451a6&language=en-US&append_to_response=credits,videos`
      );

      const currentFilm = response.data;

      const newFilm = {
        name: currentFilm.original_title,
        releaseDate: currentFilm.release_date,
        picture: `https://www.themoviedb.org/t/p/w1280${currentFilm.poster_path}`,
        description: currentFilm.overview,
        genre: currentFilm.genres[0]?.name || "uncategorized",
        crew: currentFilm.credits.crew,
        cast: currentFilm.credits.cast,
        videos: currentFilm.videos.results,
      };

      const f = await FilmModel.create(newFilm);
      const str = `${filmsInfos.length - counter} / ${filmsInfos.length}`;
      console.log(str , " - " + newFilm.name + " inserted in the DB.");
      resolve(f._id);
    } catch (e) {
      reject(e);
    }
  });
}

doRec();