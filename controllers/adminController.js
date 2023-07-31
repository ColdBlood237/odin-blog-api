const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Admin = require("../models/admin");

exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
};

exports.signup = [
  body("username", "Username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be at least 4 characters.")
    .trim()
    .isLength({ min: 4 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newAdmin = new Admin({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    });

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      const adminExists = await Admin.findOne({ username: newAdmin.username });
      if (adminExists) {
        const error = new Error("Username already used.");
        res.status(409).json(error.message);
      } else {
        await newAdmin.save();
        res.redirect("/");
      }
    }
  }),
];
