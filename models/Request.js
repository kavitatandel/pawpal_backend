const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Request = new Schema({
  // User Schema to be constructed by Kavita
});

module.exports = mongoose.model("Request", Request);
