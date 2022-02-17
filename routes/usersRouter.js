const express = require("express");
const usersRouter = express.Router();
const User = require("../models/User");
const { getUsers, getAllUsers } = require("../controllers/userController");

// Get all Users (Owners , Doglovers , Admins)
usersRouter.get("/users", getUsers);

// Get One User (Owner / Doglover / Admin)
usersRouter.get("/users/:id", getUsers);

module.exports = usersRouter;
