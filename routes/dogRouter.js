const express = require("express");
//create router level middleware
const dogRouter = express.Router();
//get the Dog Schema
const Dog = require("../models/Dog");
//get the methods from controller
const { getDogs, addDog } = require("../controllers/dogController");
const verify = require("../middleware/verify");

//get all dogs - for now to create Schema
dogRouter.get("/dogs", verify, getDogs);

//get all dogs - for now to create Schema
dogRouter.post("/adddog/:userId", verify, addDog);

module.exports = dogRouter;
