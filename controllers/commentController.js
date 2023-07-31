const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.comments_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({
    post: mongoose.Types.ObjectId(req.params.id),
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
      post: mongoose.Types.ObjectId(req.params.id),
    });

    if (!errors.isLength()) {
      res.json(errors);
    } else {
      await newComment.save();
      res.redirect(`/posts/${req.params.id}/comments`);
    }
  }),
];
