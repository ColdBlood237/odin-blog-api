const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

exports.posts_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({ public: true })
    .sort({ createdAt: -1 })
    .exec();
  res.json(allPosts);
});

exports.all_posts_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().sort({ createdAt: -1 }).exec();
  res.json(allPosts);
});

exports.create_post = [
  body("title", "Title must be specified.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Post content cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("public").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      public: req.body.public,
    });

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      await newPost.save();
      res.redirect("/posts");
    }
  }),
];

exports.post_details = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (post === null) {
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }

  res.json(post);
});

exports.update_post = [
  body("title", "Title must be specified.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Post content cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const updatedPost = new Post({
      title: req.body.title,
      content: req.body.content,
      public: req.body.public,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      const result = await Post.findByIdAndUpdate(req.params.id, updatedPost);
      res.send(`${result} successfully updated`);
    }
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  const result = await Post.findByIdAndDelete(req.params.id);
  res.send(`${result} successfully deleted.`);
});
