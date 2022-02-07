const router = require("express").Router();
const mongoose = require("mongoose");
const protectRoute = require("../middlewares/protectRoute");
const CommentModel = require("./../models/Comment.model");
const uploader = require("../config/cloudinary");
const isAuthenticated = require('./../middlewares/jwt.middleware')



router.post("/:id/comments", isAuthenticated, async (req, res, next) => {

    console.log('REQ BODY', req.body)
    console.log('REQ PAYLOAD', req.payload)

    const newComment = {...req.body, film: req.params.id, author : req.payload._id}

    try {
      console.log('TOTO' , req.body )
        const comments = await CommentModel.create(newComment);
        res.status(201).json(comments);
      } catch (er) {
        console.error(er);
      }
});

module.exports = router;