const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const { storage } = require("../cloudinary");
const multer = require("multer");
const uploadCloudinary = multer({ storage });
const { checkAdmin, isOwner, isUser } = require("../utils/middleware");
const catchAsync = require("../utils/catchAsync");

// router
//   .route("/blog")
//   .get(admin.getBlogs)
//   .post(
//     checkAdmin,
//     catchAsync,
//     uploadCloudinary.array("image"),
//     admin.postBlog
//   );

// router
//   .route("/blog/:blogId")
//   .get(admin.getIndvidualBlog)
//   .delete(checkAdmin, catchAsync, admin.deleteBlog)
//   .put(checkAdmin, catchAsync, admin.editBlog);

// router
//   .route("/portfolio")
//   .get(admin.getPorfolioItems)
//   .post(
//     checkAdmin,
//     catchAsync,
//     uploadCloudinary.array("image"),
//     admin.addPortfolioItem
//   );

// router
//   .route("/portfolio/:portfoliioId")
//   .get(admin.getIndvidualPorfolioItems)
//   .delete(checkAdmin, catchAsync, admin.deletIndvidualPortfolioItem)
//   .put(checkAdmin, catchAsync, admin.editIndividualPortfolioItem);

// router.route("/comment").post(isUser, catchAsync, admin.addComment);

// router
//   .route("blog/:blogId/comments")
//   .get(catchAsync, admin.getAllComments)
//   .put(isOwner, catchAsync, admin.editComment)
//   .delete(isOwner, catchAsync, admin.deleteComment);

// router.route("/email").post(admin.email);

module.exports = router;
