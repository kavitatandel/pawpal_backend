const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Dog = new Schema({
  // Dog Schema
});

module.exports = mongoose.model("Dog", Dog);
