const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Dog = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
  },
  breed: {
    type: String,
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
    max: 11,
  },
  size: {
    type: String,
  },
  profile_photo: {
    type: String,
  },
  description: {
    type: String,
  },
  energy: {
    type: String,
  },
  kid_friendly: {
    type: Number,
  },
  cat_friendly: {
    type: Number,
  },
  dog_friendly: {
    type: Number,
  },
  obedience: {
    type: Number,
  },
  can_stay_home: {
    type: Number,
  },
  exercise_type: {
    type: Number,
  },
  can_play_fetch: {
    type: Boolean,
  },
  photo_gallery: [String],

  pd_counter: {
    type: Number,
  },
});

module.exports = mongoose.model("Dog", Dog);
