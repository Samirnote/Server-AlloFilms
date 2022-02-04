const router = require("express").Router();
const FilmModel = require("../models/Film.model");
const CommentModel = require("../models/Comment.model");
//! Routes are prefixed with /api



//FILM MANAGEMENT

// FIND ALL FILMS
router.get("/films", (req, res, next) => {
    FilmModel.find()
        .then((dbRes) => {
            res.status(200).json(dbRes);
            console.log(dbRes);
        })
        .catch(next);
});


// FIND A FILM
router.get("/films/:id", async (req, res, next) => {
    try {
        const oneFilm = await FilmModel.findById(req.params.id);
        res.status(200).json(oneFilm);
    } catch (error) {
        next(error);
    }
});



//COMMENT MANAGEMENT

// CREATE A COMMENT 

router.post("/films/:id", async (req, res, next) => {
    try {
        console.log("here", req.body, req.params.id);
        const newComment = await CommentModel.create({
            ...req.body
        });
        res.status(201).json(newComment);
    } catch (err) {
        next(err);
    }
});


// UPDATE A COMMENT
router.patch("/films/:id", async (req, res, next) => {
    console.log("here", req.body, req.params.id);
    try {
        const updatedCat = await CommentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        next(err);
    }
});


// DELETE A COMMENT
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedCat = await CommentModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCat);
    } catch (err) {
        next(err);
    }
});



module.exports = router;
