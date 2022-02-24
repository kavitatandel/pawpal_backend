const express = require("express");
//create router level middleware
const dogRouter = express.Router();
//get the Dog Schema
const Dog = require("../models/Dog");
//get the methods from controller
const { getDogs, addDog, addDogProfilePic } = require("../controllers/dogController");
const verify = require("../middleware/verify");

//for file upload
const fileUploader = require("../configs/cloudinary.config");

//get all dogs - for now to create Schema
dogRouter.get("/dogs", getDogs);

// //add dog, add all dogs info except profile pic
//dogRouter.post("/adddog", addDog);

//add dog, add all dogs info except profile pic
dogRouter.post("/adddog", fileUploader.single("file"), addDog);

//add dog's profile pic
dogRouter.post("/addDogProfilePic", fileUploader.single("file"), addDogProfilePic);

module.exports = dogRouter;
