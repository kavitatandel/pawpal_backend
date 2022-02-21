const Dog = require('../models/Dog');
const User = require('../models/User')
const mongoose = require('mongoose')

//get the dogs by user id
const getDogsByCity = async (req, res, next) => {

    //find all dogs by passing city
    User.aggregate([
        { $match: { city: req.params.city } },
        {
            $lookup: {
                from: "dogs", //collection name inside mongoDB with which you want to aggregate with
                localField: "_id", //key from User collection(uuid)
                foreignField: "user_id", //key from dogs collection which is linked to User table
                as: "dogs_info", //name we want to give to result
            }
        },

        // Deconstructs the array field from the
        // input document to output a document
        // for each element
        {
            $unwind: "$dogs_info",
        },
    ])
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = {
    getDogsByCity
}