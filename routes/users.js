const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const User = require("../models/Users");
const users = require("../controllers/users");
const multer = require("multer");
const s3Storage = multer.memoryStorage();
const upload = multer({ storage: s3Storage });
const { isLoggedIn } = require("../utils/middleware");

router.route("/register").post(catchAsync(users.register));

router.route("/login").post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
);

router.get("/logout", users.logout);

router
  .route("/resetPassword")
  .get(catchAsync(users.renderResetPassword))
  .post(catchAsync(users.resetPassword));

router.route("/passwordResetForm/:userId/:token").post(users.passwordResetForm);

module.exports = router;
