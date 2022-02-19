const express = require("express");
const usersRouter = express.Router();
const User = require("../models/User");
const { getUsers,
    getAllUsers,
    updateUser,
} = require("../controllers/userController");

//for file upload
const fileUploader = require('../configs/cloudinary.config');


// Get all Users (Owners , Doglovers , Admins)
usersRouter.get("/users", getUsers);

// Get One User (Owner / Doglover / Admin)
// usersRouter.get("/users/:id", getUsers);

// //update user infos
// usersRouter.post('/users/:id', updateUser); //commented for file upload

//update user infos
usersRouter.post('/users/:id', fileUploader.single('file'), updateUser);

module.exports = usersRouter;
