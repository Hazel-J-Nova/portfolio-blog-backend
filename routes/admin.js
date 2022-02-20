const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");
const { storage } = require("../cloudinary");
const multer = require("multer");
const uploadCloudinary = multer({ storage });
const { checkAdmin } = require("../utils/middleware");

router
  .route("/blog")
  .get(admin.getBlogs)
  .post(uploadCloudinary.array("image"), admin.postBlog);

router.route("/blog/:blogId").get(admin.getIndvidualBlog);

router
  .route("/portfolio")
  .get(admin.getPorfolioItems)
  .post(checkAdmin, uploadCloudinary.array("image"), admin.addPortfolioItem);

router.route("/comment").post(checkAdmin, admin.addComment);

module.exports = router;
