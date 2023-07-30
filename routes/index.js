var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("NOT IMPLEMENTED YET: GET Homepage");
});

router.get("/posts", function (req, res, next) {
  res.send("NOT IMPLEMENTED YET: GET Posts");
});

router.post("/posts", function (req, res, next) {
  res.send("NOT IMPLEMENTED YET: POST a Post");
});

router.get("/posts/:id", function (req, res, next) {});
res.send("NOT IMPLEMENTED YET: GET a Post");

router.put("/posts/:id", function (req, res, next) {
  res.send("NOT IMPLEMENTED YET: UPDATE a Post");
});

router.delete("/posts/:id", function (req, res, next) {
  res.send("NOT IMPLEMENTED YET: DELETE a Post");
});

router.get("/posts/:id/comments", function (req, res, next) {
  res.send("NOT IMPLEMENTED YET: GET comments");
});

router.post("/posts/:id/comments", function (req, res, next) {
  res.send("NOT IMPLEMENTED YET: POST a comment");
});

module.exports = router;
