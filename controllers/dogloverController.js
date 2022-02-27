const Dog = require('../models/Dog');
const User = require('../models/User')
const Request = require('../models/Request')
const mongoose = require('mongoose');
const { request } = require('express');

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

//get the dogs by user id
const addPlayDateRequest = async (req, res, next) => {
    try {

        //console.log(req.body.dog_id);
        const newRequest = new Request({
            dog_id: req.body.dog_id,
            dog_lover_id: req.body.dog_lover_id,
            start_date: req.body.start_date,
            end_date: req.body.start_date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            meeting_location: req.body.meeting_location,
            status: 'Pending',
            is_expired: false,
            dl_message: req.body.dl_message,

        }
        );
        newRequest.save();
        res.send('Request has been sent to owner');
    } catch (err) {
        res.status(404).send(err);
    }
}

//get dog lovers requests
const getDogLoverRequests = async (req, res, next) => {
    try {

        Dog.aggregate([

            {
                $lookup: {
                    from: "requests",
                    let: {
                        dog_lover_id: "621411dbb4a10c071012140e"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $in: ['621411dbb4a10c071012140e', "$_id"] },
                                        { $eq: ["$dog_id", "$$_id"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "dogs"
                }
            },

        ])
    } catch (error) {
        res.status(404).send(error);
    }
}


module.exports = {
    getDogsByCity,
    addPlayDateRequest,
    getDogLoverRequests,
}

// //get dog lovers requests
// const getDogLoverRequests = async (req, res, next) => {
//     try {

//         //find all dog request by dog lover id
//         Request.aggregate([
//             // { "$match": { "dog_lover_id": '621411dbb4a10c071012140e' } },
//             {
//                 $lookup: {
//                     from: "dogs", //collection name inside mongoDB with which you want to aggregate with
//                     localField: "dog_id", //key from Request collection(uuid)
//                     foreignField: "_id", //key from dogs collection which is linked to User table
//                     as: "dogs_requests", //name we want to give to result
//                 }
//             },

//             // Deconstructs the array field from the
//             // input document to output a document
//             // for each element
//             {
//                 $unwind: "$dogs_requests",
//             },
//             // { "$match": { "dog_lover_id": '621411dbb4a10c071012140e' } }
//         ])
//             .then((result) => {
//                 res.send(result);
//             })

//     } catch (error) {
//         res.status(404).send(error);
//     }
// }
