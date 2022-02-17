const express = require('express');
//create router level middleware
const dogRouter = express.Router();
//get the Dog Schema
const Dog = require('../models/Dog');
//get the methods from controller
const { getDogs } = require('../controllers/dogController')

//get all dogs - for now to create Schema
dogRouter.get('/dogs', getDogs);

module.exports = dogRouter;