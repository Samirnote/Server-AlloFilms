const router = require("express").Router();
const mongoose = require("mongoose");
const protectRoute = require("../middlewares/protectRoute");
const FilmModel = require("./../models/Film.model");
const uploader = require("../config/cloudinary");
const CommentModel = require("../models/Comment.model");

router.get("/films", (req, res, next) => {
  const expression = new RegExp(req.query.q, "i");
  const q = !req.query.q ? {} : { name: { $regex: expression } };
  const offset = req.query.offset;
  // ramener la valeur du offset a partir du front-end

  console.log(req.query);
  FilmModel.find(q, null, {
    skip: offset,
    limit: 15, // methode query mongoose pour options pagination
  })
    //.populate("author")
    .then((dbFilms) => {
      //console.log("all films found in the databases :", dbFilms);
      console.log("REQ PAYLOAD", req.payload);
      res.status(201).json(dbFilms);
    })
    .catch((err) => {
      console.error(
        "there was an error while getting the films list from the database",
        err
      );
    });
});

router.get("/films/lastReleased", (req, res, next) => {
  console.log(req.query);
  FilmModel.find()
    .sort({ releasedDate: 1 })
    .limit(5)
    .then((dbFilms) => {
      console.log("REQ PAYLOAD", req.payload);
      res.status(201).json(dbFilms);
    })
    .catch((err) => {
      console.error(
        "there was an error while getting the films list from the database",
        err
      );
    });
});

// router.get("films/lastReleased", (req, res, next) => {
//   const expression = new RegExp(req.query.q, "i");
//   const q = !req.query.q ? {} : { name: { $regex: expression } };
//   const offset = req.query.offset;
//   // const q = { name, releaseDate:}
//   // { sort: { releaseDate: 1 } };
//   FilmModel.find(q, null, {
//     skip: offset,
//     limit: 15, // methode query mongoose pour options pagination
//   })
//     // .sort({ releaseDate: 1 })
//     .then((dbFilms) => {
//       console.log("REQ PAYLOAD ", req.payload);
//       res.status(201).json(dbFilms);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });

router.get("/films/:id", async (req, res, next) => {
  try {
    //console.log("jeusi la", req.params.id)
    const oneFilm = await FilmModel.findById(req.params.id);
    //console.log("jeusi le film recherch??", oneFilm)
    res.status(201).json(oneFilm);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
