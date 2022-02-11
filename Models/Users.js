const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

mongoose.models = {};
mongoose.modelSchemas = {};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  admin: { type: Boolean, default: false },

  emailVerified: { type: Boolean, default: false },
  token: { type: String, default: "" },
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
