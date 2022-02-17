const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Request Schema
const Request = new Schema({
  dog_id: {
    type: Schema.Types.ObjectId,
    ref: 'Dog'
  },
  dog_lover_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  start_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end_date: {
    type: Date,
    default: Date.now
  },
  start_time: {
    type: String,
    default: Date.now,
    required: true,
  },
  end_time: {
    type: String,
    default: Date.now,
    required: true,
  },
  meeting_location: {
    type: String,
    required: true,
  },
  status: {
    type: String
  },
  is_expired: {
    type: Boolean
  },
  dl_message: {
    type: String,
  },
  owner_reason: {
    type: String
  },
  owner_message: {
    type: String
  },
  //will be used if owner wants to put request for sitting his/her dog
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  can_home_sit: {
    type: Boolean
  },
});

module.exports = mongoose.model("Request", Request);
