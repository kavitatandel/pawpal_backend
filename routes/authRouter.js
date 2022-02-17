const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { registerUser, userLogin } = require("../controllers/authController");

//creating route to register user
authRouter.post('/register', registerUser);

//creating route for user login
authRouter.get('/login', userLogin);

module.exports = authRouter;