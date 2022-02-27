const express = require("express");
const dogloversRouter = express.Router();
const User = require("../models/User");

const { getDogsByCity,
  addPlayDateRequest,
  getDogLoverRequests } = require("../controllers/dogloverController");
const verify = require("../middleware/verify");

// Get all Users (Doglover) with type = "doglover"
dogloversRouter.get("/doglovers", async (req, res) => {
  try {
    const users = await User.find({
      type: "doglover",
    });
    res.json(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get one Doglover with user id
dogloversRouter.get("/doglover/:id", async (req, res) => {
  try {
    const oneUser = await User.findOne({ id: req.params._id });
    res.json(oneUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get dogs by city
dogloversRouter.get("/searchdog/:city", getDogsByCity);

// Get dogs by city
dogloversRouter.post("/addPlayDateRequest", addPlayDateRequest);

// Get dogs by city
dogloversRouter.get("/getDogLoverRequests", getDogLoverRequests);


module.exports = dogloversRouter;
