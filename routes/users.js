const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");
const multer = require("multer");
const s3Storage = multer.memoryStorage();
const upload = multer({ storage: s3Storage });

// router.route("/register").post(users.register);

// router.route("/login").post(passport.authenticate("local"), users.login);

// router.get("/logout", users.logout);

// router.route("/resetPassword").post(catchAsync(users.resetPassword));

// router.route("/passwordResetForm/:userId/:token").post(users.passwordResetForm);

module.exports = router;
