const User = require("../models/User");

// Get all Users (Owners , Doglovers , Admins)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(404).send(err);
  }
};

// Get all Users (Owners , Doglovers , Admins)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(404).send(err);
  }
};

// Get all Users (Owners , Doglovers , Admins)
const updateUser = async (req, res, next) => {
  try {
    const userFind = await User.findOne({ _id: req.params.id });
    await userFind.updateOne({ $set: req.body })
    res.send('User is successfully updated.');
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  getUsers,
  getAllUsers,
  updateUser,
};
