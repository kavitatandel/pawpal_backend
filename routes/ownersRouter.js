const express = require("express");
const usersRouter = express.Router();
const User = require("../models/User");

// Get all Users (Owners) with type = "owner"
ownersRouter.get("/owners", verify, async (req, res) => {
  try {
    const users = await User.find({
      type: "owner",
    });
    res.json(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get one Owner with user id
ownersRouter.get("/owner/:id", async (req, res) => {
  try {
    const oneUser = await User.findOne({ id: req.params._id });
    res.json(oneUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = ownersRouter;
