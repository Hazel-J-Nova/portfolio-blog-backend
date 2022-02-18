const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

mongoose.models = {};
mongoose.modelSchemas = {};

ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});
const opts = { toJSON: { virtuals: true } };

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  avatar: ImageSchema,

  admin: { type: Boolean, default: false },

  emailVerified: { type: Boolean, default: false },
  token: { type: String, default: "" },
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
