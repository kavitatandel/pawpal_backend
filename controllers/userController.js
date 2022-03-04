const { default: mongoose } = require("mongoose");
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

// // //check if email exist
// const checkEMailExist = async (req, res, next) => {
//   try {
//     const emailExist = await User.findOne({ email: req.body.email, _id: { $ne: mongoose.Types.ObjectId(req.body._id) } });
//     if (emailExist) {
//       return res.status(400).send(true);
//     } else {
//       return res.status(400).send(false);
//     }

//   } catch (err) {
//     res.status(404).send(err);
//   }
// }

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




module.exports = {
  getUsers,
  // getAllUsers,
  updateUser,
  getSingleUser,

};
