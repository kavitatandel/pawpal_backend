const Dog = require('../models/Dog');
const User = require('../models/User')
const Request = require('../models/Request')
//const mongoose = require('mongoose');

//get dog requests for owner
const GetPlayDateRequestsForOwner = async (req, res, next) => {
    const owner_id = req.body.owner_id;
    console.log(owner_id);
    try {
        //console.log("backend owner play date request")
        Request.aggregate([{
            $lookup: {
                from: 'dogs',
                localField: 'dog_id',
                foreignField: '_id',
                as: 'DogsRequests'
            }
        },
        // { $match: { user_id: "6213a701fba733c6436413e2" } },
        {
            $unwind: '$DogsRequests'
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
            // {
            //     $addFields: {
            //         "Dog_Name": "$DogsRequests.name",
            //         "Dog_Profile_Photo": "$DogsRequests.profile_photo",
            //         "Dog_Meeting_Location": "$DogsRequests.meeting_location",
            //         "Dog_Meeting_Start_Date": "$DogsRequests.start_date",
            //         "Dog_Lover_First_Name": "$DogLovers.first_name",
            //         "Dog_Lover_Last_Name": "$DogLovers.last_name",
            //         "Dog_Lover_Street": "$DogLovers.street",
            //         "Dog_Lover_Zip_Code": "$DogLovers.zip_code",
            //         "Dog_Lover_City": "$DogLovers.city",
            //         "Dog_Lover_Country": "$DogLovers.country",
            //     }
            // },
            // {
            //     $project: {
            //         Dog_Name: 1,
            //         Dog_Profile_Photo: 1,
            //         Dog_Meeting_Location: 1,
            //         Dog_Meeting_Start_Date: 1,
            //         Dog_Lover_First_Name: 1,
            //         Dog_Lover_Last_Name: 1,
            //         Dog_Lover_Street: 1,
            //         Dog_Lover_Zip_Code: 1,
            //         Dog_Lover_City: 1,
            //         Dog_Lover_Country: 1
            //     }
            // }

            // {
            //     $project: {
            //         name: 1,
            //         DogsRequests: {
            //             $filter: {
            //                 input: "$DogsRequests",
            //                 as: "test",
            //                 cond: { $eq: ["$user_id", '6213a701fba733c6436413e2'] }
            //             }
            //         }
            //     }
            // },
        ])
            .then((result) => {
                //console.log(result);
                res.send(result);
            })

    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = {
    GetPlayDateRequestsForOwner,
}
