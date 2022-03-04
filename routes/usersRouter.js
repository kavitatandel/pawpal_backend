const express = require("express");
const usersRouter = express.Router();
const User = require("../models/User");
const verify = require("../middleware/verify");
const {
  getUsers,
  getSingleUser,
  //   getAllUsers,
  updateUser,
  updateUserProfile,
} = require("../controllers/userController");

//for file upload
const fileUploader = require("../configs/cloudinary.config");

// Get all Users (Owners , Doglovers , Admins)
usersRouter.get("/users", getUsers);

// //edit user profile info except photo
// usersRouter.get("/users/checkemail", checkEMailExist)

// Get One User (Owner / Doglover / Admin)
usersRouter.get("/users/:id", getSingleUser); //////// CORALEE REMOVED "verify" for testing

// //update user infos
// usersRouter.post('/users/:id', updateUser); //commented for file upload

//update user photo
usersRouter.post("/users/:id", fileUploader.single("file"), updateUser);

module.exports = usersRouter;
