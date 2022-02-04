const router = require("express").Router();
const mongoose = require("mongoose");
const protectRoute = require("../middlewares/protectRoute");
const FilmModel = require('./../models/Film.model');
const uploader = require("../config/cloudinary");

router.get("/films", /*protectRoute,*/ (req, res, next) => {
    FilmModel.find()
      //.populate("author")
      .then((dbFilms) => {
        //console.log("all films found in the databases :", dbFilms);
        res.status(201).json({ films: dbFilms });
      })
      .catch((err) => {
        console.error(
          "there was an error while getting the films list from the database",
          err
        );
        next(err);
      });
  });