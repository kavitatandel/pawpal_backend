const Dog = require('../models/Dog');
const User = require('../models/User')
const Request = require('../models/Request')
const mongoose = require('mongoose');


//get dog requests for owner
const GetPlayDateRequestsForOwner = async (req, res, next) => {
    // const owner_id = req.body.owner_id;
    // console.log(req.body.owner_id);
    const owner_id = req.params.ownerid;
    // console.log(owner_id);

    try {
        //console.log("backend owner play date request")
        Request.aggregate([
            {

                $lookup: {
                    from: 'dogs',//schema name in mongoDB database (schema in backend app is Dog)
                    localField: 'dog_id',// field from request schema
                    foreignField: '_id',//field from dog schema
                    as: 'DogsRequests', // makes temp schema which has records from dog table which has a join with request table
                }
            },

            {
                $match: {
                    //to access any field from dogs schema, you should refer ot by temp schema name
                    //which is now DogsRequests
                    // "DogsRequests.user_id": mongoose.Types.ObjectId("62179f513f68399eeacd0952")
                    // "DogsRequests.user_id": owner_id
                    "DogsRequests.user_id": mongoose.Types.ObjectId(owner_id)
                    , "status": "Pending"
                }
            },

            {
                $unwind: '$DogsRequests' // unwind turns array result into object
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'dog_lover_id',
                    foreignField: '_id',
                    as: 'DogLovers'
                }
            },

            {
                $unwind: '$DogLovers'
            },

        ])
            .then((result) => {
                //console.log(result);
                res.send(result);
            })

    } catch (error) {
        res.status(404).send(error);
    }
}

//get approved dog requests for owner
const GetApprovedRequestsForOwner = async (req, res, next) => {
    // const owner_id = req.body.owner_id;
    // console.log(req.body.owner_id);
    const owner_id = req.params.ownerid;
    // console.log(owner_id);

    try {
        //console.log("backend owner play date request")
        Request.aggregate([
            {

                $lookup: {
                    from: 'dogs',//schema name in mongoDB database (schema in backend app is Dog)
                    localField: 'dog_id',// field from request schema
                    foreignField: '_id',//field from dog schema
                    as: 'DogsRequests', // makes temp schema which has records from dog table which has a join with request table
                }
            },

            {
                $match: {
                    //to access any field from dogs schema, you should refer ot by temp schema name
                    //which is now DogsRequests
                    // "DogsRequests.user_id": mongoose.Types.ObjectId("62179f513f68399eeacd0952")
                    // "DogsRequests.user_id": owner_id
                    "DogsRequests.user_id": mongoose.Types.ObjectId(owner_id)
                    , "status": "Approved"
                }
            },

            {
                $unwind: '$DogsRequests' // unwind turns array result into object
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'dog_lover_id',
                    foreignField: '_id',
                    as: 'DogLovers'
                }
            },

            {
                $unwind: '$DogLovers'
            },

        ])
            .then((result) => {
                //console.log(result);
                res.send(result);
            })

    } catch (error) {
        res.status(404).send(error);
    }
}

//update request by owner
const UpdatePlayDateRequest = async (req, res, next) => {
    try {
        const requestFind = await Request.findOne({ _id: req.body.requestid });

        await requestFind.updateOne({
            $set: {
                status: req.body.status,
                owner_message: req.body.owner_message,
                owner_reason: req.body.owner_reason,
            }
        });
        res.send("Request has been updated.")

    } catch (error) {
        res.status(404).send(error);
    }
}


//check if email exist
const checkEMailExist = async (req, res, next) => {
    try {
        // console.log(req.params.email);
        const emailExist = await User.findOne({ email: req.params.email, _id: { $ne: mongoose.Types.ObjectId(req.params.userid) } });
        //const emailExist = await User.findOne({ email: req.body.email })
        //console.log(emailExist);
        if (emailExist) {
            return res.send(true);
        } else {
            return res.send(false);
        }

    } catch (err) {
        res.status(404).send(err);
    }
}

// update user profile
const updateUserProfile = async (req, res) => {
    try {
        //console.log(req.body._id)
        //console.log(req.body.description)
        //find the user based on id
        const userFind = User.findOne({ _id: mongoose.Types.ObjectId(req.body._id) })
        //const userFind = await User.findOne({ _id: req.body._id })
        //console.log(userFind)
        await userFind.updateOne({
            $set: {
                _id: req.body._id,
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


        await res.send(
            `You have successfully Updated ${req.body.first_name} ${req.body.last_name}`
        );

    } catch (err) {
        res.status(404).send(err);
    }
};

module.exports = {
    GetPlayDateRequestsForOwner,
    UpdatePlayDateRequest,
    GetApprovedRequestsForOwner,
    checkEMailExist,
    updateUserProfile
}
