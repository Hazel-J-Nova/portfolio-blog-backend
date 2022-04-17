const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  body: String,
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  blog: { type: Schema.Types.ObjectId, ref: "Blogs" },
});

module.exports = mongoose.model("Comments", CommentsSchema);
