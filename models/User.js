const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  // User Schema
  first_name: {
    type: String,
    required: true,
    minLength: 3,
    maxlength: 30,
  },
  last_name: {
    type: String,
    required: true,
    minLength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  user_type: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", User);
