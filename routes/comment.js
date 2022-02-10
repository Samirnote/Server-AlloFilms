const router = require("express").Router();
const mongoose = require("mongoose");
const protectRoute = require("../middlewares/protectRoute");
const CommentModel = require("./../models/Comment.model");
const uploader = require("../config/cloudinary");
const isAuthenticated = require("./../middlewares/jwt.middleware");

router.get("/films/:id/comments", async (req, res, next) => {
  try {
    const comments = await CommentModel.find({ film: req.params.id }).populate(
      "author"
    );
    // const comments = await CommentModel.find({ film: req.params.id }).populate({path:"author"});
    res.status(201).json(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/films/:id/comments", isAuthenticated, async (req, res, next) => {
  // console.log('REQ BODY', req.body)
  // console.log('REQ PAYLOAD', req.payload)

  const newComment = {
    ...req.body,
    film: req.params.id,
    author: req.payload._id,
  };

  try {
    // console.log('TOTO' , req.body )
    let comment = await CommentModel.create(newComment);
    comment = await comment.populate("author");
    res.status(201).json(comment);
  } catch (er) {
    console.error(er);
  }
});

router.patch(
  "/films/:id/comments/:idComment",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const updatedComment = await CommentModel.findByIdAndUpdate(
        req.params.idComment,
        req.body,
        { new: true }
      );
      // console.log("req ", req);
      console.log("req body ", req.body);
      console.log("req.params.idComment ", req.params.idComment);
      console.log("comment ", updatedComment);
      res.status(201).json(updatedComment);
    } catch (er) {
      console.error(er);
    }
  }
);

router.delete(
  "/films/:id/comments/:idComment",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const deletedComment = await CommentModel.findByIdAndDelete(
        req.params.idComment
      );
      res.status(202).json(deletedComment);
    } catch (er) {
      next(er);
    }
  }
);

router.get("/comments/lastComments", (req, res, next) => {
  console.log(req.query);
  CommentModel.find()
    .populate("film")
    .populate("author")
    .sort({ date: -1 })
    .limit(10)
    .then((dbComments) => {
      console.log("REQ PAYLOAD", req.payload);
      res.status(201).json(dbComments);
    })
    .catch((err) => {
      console.error(
        "there was an error while getting the films list from the database",
        err
      );
    });
});

module.exports = router;
