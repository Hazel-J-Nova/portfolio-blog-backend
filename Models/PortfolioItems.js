const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_480/h_480");
});
const PortfolioItemSchema = new Schema({
  title: String,
  alt: String,
  images: ImageSchema,
  url: String,
});

module.exports = mongoose.model("PortfolioItem", PortfolioItemSchema);
