const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const admin_controller = require("../controllers/adminController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/posts");
});

router.post("/admin-login", admin_controller.login);

router.get("/posts", post_controller.posts_list);

router.get("/posts/:id", post_controller.post_details);

router.get("/posts/:id/comments", comment_controller.comments_list);

router.post("/posts/:id/comments", comment_controller.create_comment);

module.exports = router;
