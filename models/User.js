const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//******************NOTE************************//
//mongoose does not support float/double but mongoDB
//in order to have field with datatype double
//do this you have to install mongoose-double package
//npm install mongoose-double
//******************NOTE************************//

//use mongoose-double for your Schema
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

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
  profile_pic: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zip_code: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  latitude: {
    type: SchemaTypes.Double,
    required: false,
  },
  longitude: {
    type: SchemaTypes.Double,
    required: false,
  },
  location: {
    //using this to avoid confusion between type of mongoose
    //and GeoJSON type
    type: { type: String },
    coordinates: [Number],
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", User);
