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
const getSingleUser = async (req, res, next) => {
  try {
    const users = await User.findOne({ _id: req.params.id });
    res.json(users);
  } catch (err) {
    res.status(404).send(err);
  }
};

//check if email exist
const checkEMailExist = async (req, res, next) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send(true);

  } catch (err) {
    res.status(404).send(err);
  }
}

// update user (Owners , Doglovers , Admins)
const updateUser = async (req, res, next) => {
  try {
    //added 19.0.2022
    //get uploaded file
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    const url = req.file.path;
    console.log(req.file.path);
    console.log(url);
    //console.log(req);
    const desc = req.body.desc;
    console.log("desc");
    console.log(desc);
    //added 19.0.2022

    const userFind = await User.findOne({ _id: req.params.id });
    // await userFind.updateOne({ $set: req.body })

    await userFind.updateOne({
      $set: {
        description: desc,
        profile_pic: url,
      },
    });
    res.json({ secure_url: req.file.path });
    // res.send('User is successfully updated.');
  } catch (err) {
    res.status(404).send(err);
  }
};

// Registration for all Users
const updateUserProfile = async (req, res) => {
  try {
    //find the user based on id
    const userFind = User.findOne({ _id: req.params.id })

    await userFind.updateOne({
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        street: req.body.street,
        city: req.body.city,
        zip_code: req.body.zip_code,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description
      }
    });

    res.send(
      `You have successfully Updated ${req.body.first_name} ${req.body.last_name}`
    );

  } catch (err) {
    res.status(404).send(err);
  }
};


module.exports = {
  getUsers,
  // getAllUsers,
  updateUser,
  getSingleUser,
  updateUserProfile,
  checkEMailExist
};
