const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Dog = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
  },
  age_years: {
    type: Number,
    min: 0,
    max: 30,
  },
  age_months: {
    type: Number,
    min: 0,
    max: 12,
  },
  // size: {},
  images: [String],
});

module.exports = mongoose.model("Dog", Dog);
