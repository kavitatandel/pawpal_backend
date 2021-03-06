const express = require("express");
const ownerRouter = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const Request = require("../models/Request");

const { GetPlayDateRequestsForOwner, UpdatePlayDateRequest, GetApprovedRequestsForOwner,
    checkEMailExist, updateUserProfile
} = require("../controllers/ownerController");

ownerRouter.get('/GetPlayDateRequestsForOwner', GetPlayDateRequestsForOwner);
ownerRouter.get('/GetPlayDateRequestsForOwner/:ownerid', GetPlayDateRequestsForOwner);
ownerRouter.get('/GetApprovedRequestsForOwner/:ownerid', GetApprovedRequestsForOwner);
ownerRouter.post('/UpdatePlayDateRequest', UpdatePlayDateRequest);

ownerRouter.get('/checkemailaddress/:userid/:email', checkEMailExist);

//edit user profile info except photo
ownerRouter.post("/updateuserprofile", updateUserProfile)

module.exports = ownerRouter;
