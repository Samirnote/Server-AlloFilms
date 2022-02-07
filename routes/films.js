const router = require("express").Router();
const mongoose = require("mongoose");
const protectRoute = require("../middlewares/protectRoute");
const FilmModel = require("./../models/Film.model");
const uploader = require("../config/cloudinary");

router.get("/films", (req, res, next) => {
  
  const expression = new RegExp(req.query.q, "i")
  const q = !req.query.q ? {} : { name: {$regex: expression} };

  console.log(req.query);
  FilmModel.find(q)
    //.populate("author")
    .then((dbFilms) => {
      //console.log("all films found in the databases :", dbFilms);
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
