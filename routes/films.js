const router = require("express").Router();
const mongoose = require("mongoose");
const protectRoute = require("../middlewares/protectRoute");
const FilmModel = require("./../models/Film.model");
const uploader = require("../config/cloudinary");

router.get("/films", (req, res, next) => {
  
  const expression = new RegExp(req.query.q, "i")
  const q = !req.query.q ? {} : { name: {$regex: expression} };
  const offset = req.query.offset;   // ramener la valeur du offset a partir du front-end
  //const maxFilm = req.query.maxFilm;
  // let limit = parseInt(req.query.limit)
  // if(!SUPPORTED_LIMITS.includes(parseInt(req.query.limit))) {
  //   limit = 10;
  // }

  console.log(req.query);
  FilmModel.find(q, null, {
    skip: offset, limit : 15   // methode query mongoose pour options pagination
  })
    //.populate("author")
    .then((dbFilms) => {
      //console.log("all films found in the databases :", dbFilms);
      console.log("REQ PAYLOAD",req.payload)
      res.status(201).json(dbFilms);
    })
    .catch((err) => {
      console.error(
        "there was an error while getting the films list from the database",
        err
      );
    });
});

router.get("/films/:id", async (req, res, next) => {
  try {
    //console.log("jeusi la", req.params.id)
    const oneFilm = await FilmModel.findById(req.params.id);
    //console.log("jeusi le film recherché", oneFilm)
    res.status(201).json(oneFilm);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
