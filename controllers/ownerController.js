const Dog = require('../models/Dog');
const User = require('../models/User')
const Request = require('../models/Request')
const mongoose = require('mongoose');


//get dog requests for owner
const GetPlayDateRequestsForOwner = async (req, res, next) => {
    const owner_id = req.body.owner_id;
    //console.log(owner_id);
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
                    "DogsRequests.user_id": mongoose.Types.ObjectId("62179f513f68399eeacd0952")
                    // , "status": "Pending"
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


// //get dog requests for owner
// const GetPlayDateRequestsForOwner = async (req, res, next) => {
//     // const owner_id = req.body.owner_id;
//     const owner_id = '62179f513f68399eeacd0952';
//     //console.log(owner_id);
//     try {
//         //console.log("backend owner play date request")
//         Request.aggregate([
//             // { $match: { "dog_id": mongoose.Types.ObjectId("6213a88bfba733c6436413e7") } },
//             {
//                 /*********************************** */
//                 // $lookup: {
//                 //     from: 'dogs',
//                 //     localField: 'dog_id',
//                 //     foreignField: '_id',
//                 //     as: 'DogsRequests',
//                 // }
//                 /************************************* */


//                 /************************************************* */
//                 // $lookup: {
//                 //     from: 'dogs',
//                 //     let: { id: "$user_id" },
//                 //     pipeline: [
//                 //         { $project: { _id: 1, user_id: { "$toObjectId": "$$id" } } },
//                 //         { $match: { $expr: { $eq: ["_id", "$$id"] } } }
//                 //     ],
//                 //     as: 'DogsRequests',
//                 // }
//                 /************************************************ */

//                 $lookup: {
//                     from: 'dogs',
//                     // localField: 'dog_id',
//                     // foreignField: '_id',
//                     // let: { id: mongoose.Types.ObjectId("62179f513f68399eeacd0952") },
//                     // pipeline: [
//                     //     { $match: { $expr: { $eq: ['user_id', '$$id'] } } },
//                     // ],
//                     pipeline: [
//                         { $match: { 'user_id': '62179f513f68399eeacd0952' } },
//                     ],
//                     as: 'DogsRequests',
//                 }

//             },

//             {
//                 $unwind: '$DogsRequests'
//             },

//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'dog_lover_id',
//                     foreignField: '_id',
//                     as: 'DogLovers'
//                 }
//             },

//             {
//                 $unwind: '$DogLovers'
//             },
//             // {
//             //     $addFields: {
//             //         "Dog_Name": "$DogsRequests.name",
//             //         "Dog_Profile_Photo": "$DogsRequests.profile_photo",
//             //         "Dog_Meeting_Location": "$DogsRequests.meeting_location",
//             //         "Dog_Meeting_Start_Date": "$DogsRequests.start_date",
//             //         "Dog_Lover_First_Name": "$DogLovers.first_name",
//             //         "Dog_Lover_Last_Name": "$DogLovers.last_name",
//             //         "Dog_Lover_Street": "$DogLovers.street",
//             //         "Dog_Lover_Zip_Code": "$DogLovers.zip_code",
//             //         "Dog_Lover_City": "$DogLovers.city",
//             //         "Dog_Lover_Country": "$DogLovers.country",
//             //     }
//             // },
//             // {
//             //     $project: {
//             //         Dog_Name: 1,
//             //         Dog_Profile_Photo: 1,
//             //         Dog_Meeting_Location: 1,
//             //         Dog_Meeting_Start_Date: 1,
//             //         Dog_Lover_First_Name: 1,
//             //         Dog_Lover_Last_Name: 1,
//             //         Dog_Lover_Street: 1,
//             //         Dog_Lover_Zip_Code: 1,
//             //         Dog_Lover_City: 1,
//             //         Dog_Lover_Country: 1
//             //     }
//             // }

//             // {
//             //     $project: {
//             //         name: 1,
//             //         DogsRequests: {
//             //             $filter: {
//             //                 input: "$DogsRequests",
//             //                 as: "test",
//             //                 cond: { $eq: ["$user_id", '6213a701fba733c6436413e2'] }
//             //             }
//             //         }
//             //     }
//             // },
//         ])
//             .then((result) => {
//                 //console.log(result);
//                 res.send(result);
//             })

//     } catch (error) {
//         res.status(404).send(error);
//     }
// }



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

module.exports = {
    GetPlayDateRequestsForOwner,
    UpdatePlayDateRequest,
}



// const GetPlayDateRequestsForOwner = async (req, res, next) => {
//     // const owner_id = req.body.owner_id; // this is the owner of a dog and with user_id field inside Dog table
//     // console.log(owner_id);
//     const owner_id = "6213a701fba733c6436413e2";

//     // User.findOne({ used_id: mongoose.Types.ObjectId('6213a701fba733c6436413e2') })
//     // try {
//     //     const users = await User.find({ user_id: owner_id }).populate("Dog Request");
//     //     res.json({
//     //         data: users,
//     //         msg: "show all users",
//     //     });
//     // } catch (err) {
//     //     console.log(err);
//     // }


// }