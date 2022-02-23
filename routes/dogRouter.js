const express = require("express");
//create router level middleware
const dogRouter = express.Router();
//get the Dog Schema
const Dog = require("../models/Dog");
//get the methods from controller
const { getDogs, addDog, addDogProfilePic } = require("../controllers/dogController");
const verify = require("../middleware/verify");

//get all dogs - for now to create Schema
dogRouter.get("/dogs", getDogs);

//add dog, add all dogs info except profile pic
dogRouter.post("/adddog", addDog);

//add dog's profile pic
dogRouter.post("/addDogProfilePic", addDogProfilePic);


module.exports = dogRouter;
