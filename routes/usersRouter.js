const express = require("express");
const usersRouter = express.Router();
const User = require("../models/User");

// Get all Users (Owners , Doglovers , Admins)
usersRouter.get("/users", verify, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get One User (Owner / Doglover / Admin)
usersRouter.get("/users/:id", async (req, res) => {
  try {
    const oneUser = await User.findOne({ id: req.params._id });
    res.json(oneUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = usersRouter;
