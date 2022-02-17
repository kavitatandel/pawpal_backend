const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verify = require("../middleware/verify");

// Registration for all Users
authRouter.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    type: req.body.type,
  });
  newUser.save();
  res.send(`You have successfully registered ${newUser.username}`);
});

// Login for all Users
authRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found, please register");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send("Password is not valid, please try again!");

  const token = jwt.sign({ user }, process.env.SECRET);
  res.header("auth-token", token);
  res.json(token);
});
