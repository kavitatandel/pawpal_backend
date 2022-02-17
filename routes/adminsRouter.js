const express = require("express");
const adminsRouter = express.Router();
const User = require("../models/User");

// Get all Administrators with type = "admin"
adminsRouter.get("/admins", verify, async (req, res) => {
  try {
    const users = await User.find({
      type: "admin",
    });
    res.json(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get one Admin with user id
adminsRouter.get("/admin/:id", async (req, res) => {
  try {
    const oneUser = await User.findOne({ id: req.params._id });
    res.json(oneUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = adminsRouter;
