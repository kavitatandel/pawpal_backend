const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Registration for all Users
const registerUser = async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        //fieldname in databse : name of the paramter passed from frontend
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashPassword,
        user_type: req.body.user_type,
    });
    newUser.save();
    res.send(`You have successfully registered ${newUser.first_name} ${newUser.last_name}`);
};

// Login for all Users
const userLogin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found, please register");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send("Password is not valid, please try again!");

    const token = jwt.sign({ user }, process.env.SECRET);
    res.header("auth-token", token);
    res.json(token);
};

module.exports = {
    registerUser,
    userLogin
}