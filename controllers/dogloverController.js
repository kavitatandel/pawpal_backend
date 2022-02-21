const Dog = require('../models/Dog');
const User = require('../models/User')

//get the dogs by user id
const getDogsByCity = async (req, res, next) => {
    console.log("Get Dogs By City")
    try {
        console.log("Get Dogs By City -2")
        User.aggregate(pipeline, { allowDiskUse: true });
        User.aggregate([{
            $lookup: {
                from: 'Dog',
                localField: 'user_id',
                foreignField: '_id',
                as: 'searchedDogs'
            }
        }]);
        console.log("Get Dogs By City -3")
        console.log(User)
        res.send(User);
    }
    catch (err) {
        res.status(404).send(err);
    }
}

module.exports = {
    getDogsByCity
}