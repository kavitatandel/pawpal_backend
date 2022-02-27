const express = require("express");
const ownerRouter = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const Request = require("../models/Request");

const { GetPlayDateRequestsForOwner, UpdatePlayDateRequest
} = require("../controllers/ownerController");

ownerRouter.get('/GetPlayDateRequestsForOwner', GetPlayDateRequestsForOwner);
ownerRouter.post('/UpdatePlayDateRequest', UpdatePlayDateRequest);

module.exports = ownerRouter;
