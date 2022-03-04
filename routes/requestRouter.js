const express = require("express");
const requestRouter = express.Router();

//use methods from controller
const { getAllRequests } = require("../controllers/requestController");

requestRouter.get("/requests", getAllRequests);

module.exports = requestRouter;
