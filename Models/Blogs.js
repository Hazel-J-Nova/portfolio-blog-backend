const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Content = require("./Comments");

ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});
const opts = { toJSON: { virtuals: true } };

const BlogSchema = new Schema({
  title: String,
  introText: String,
  body: String,
  img: ImageSchema,
  blogLink: String,
  tags: [{ type: String }],
  date: { type: Date, default: Date.now() },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

module.exports = mongoose.model("Blog", BlogSchema);
