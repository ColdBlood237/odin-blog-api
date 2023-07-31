const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/posts");
});

router.get("/posts", post_controller.posts_list);

router.post("/posts", post_controller.create_post);

router.get("/posts/:id", post_controller.post_details);

router.put("/posts/:id", post_controller.update_post);

router.delete("/posts/:id", post_controller.delete_post);

router.get("/posts/:id/comments", comment_controller.comments_list);

router.post("/posts/:id/comments", comment_controller.create_comment);

module.exports = router;
