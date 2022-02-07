const router = require("express").Router();
const mongoose = require("mongoose");
const protectRoute = require("../middlewares/protectRoute");
const CommentModel = require("./../models/Comment.model");
const uploader = require("../config/cloudinary");



router.post("/:id/comments", async (req, res, next) => {

    console.log(req.body)
    
    const newComment = {...req.body, author : req.session.currentUser._id, film: req.params.id }

    

    
    try {
        const comments = await CommentModel.create(newComment);
        res.status(201).json(comments);
      } catch (er) {
        console.error(er);
      }
});

module.exports = router;