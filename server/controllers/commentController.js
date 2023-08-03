const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.comments_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({
    post: new mongoose.Types.ObjectId(req.params.id),
  })
    .populate("post")
    .sort({ createdAt: -1 })
    .exec();
  res.json(comments);
});

exports.create_comment = [
  body("username").trim().escape(),
  body("content", "Comment cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newComment = new Comment({
      username: req.body.username === "" ? "Anonymous" : req.body.username,
      content: req.body.content,
      post: new mongoose.Types.ObjectId(req.params.id),
    });

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      await newComment.save();
      res.redirect("back");
    }
  }),
];

exports.update_comment = [
  body("username").trim().escape(),
  body("content", "Comment cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newComment = new Comment({
      _id: req.params.comment_id,
      username: req.body.username === "" ? "Anonymous" : req.body.username,
      content: req.body.content,
      post: new mongoose.Types.ObjectId(req.params.post_id),
    });

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      const result = await Comment.findByIdAndUpdate(
        req.params.comment_id,
        newComment
      );
      res.send(`${result} successfully updated`);
    }
  }),
];

exports.delete_comment = asyncHandler(async (req, res, next) => {
  const result = await Comment.findByIdAndDelete(req.params.comment_id);
  res.send(`${result} successfully deleted.`);
});
