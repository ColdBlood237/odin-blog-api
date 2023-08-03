var express = require("express");
var router = express.Router();

const post_controller = require("../controllers/postController");
const admin_controller = require("../controllers/adminController");

router.post("/admin-signup", admin_controller.signup);

router.get("/all-posts", post_controller.all_posts_list);

router.post("/posts", post_controller.create_post);

router.put("/posts/:id", post_controller.update_post);

router.delete("/posts/:id", post_controller.delete_post);

router.get("/validate-token", admin_controller.validate_token);

module.exports = router;
