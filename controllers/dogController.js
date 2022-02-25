const Dog = require('../models/Dog')

//get the dogs by user id
const getDogs = async (req, res, next) => {
    try {
        const Dogs = await Dog.find();
        res.json(Dogs);
    }
    catch (err) {
        res.status(404).send(err);
    }
}


// const addDog = (req, res, next) => {
//     try {

//         const filepath = "";
//         //get uploaded file
//         if (!req.file) {
//             // next(new Error("No file uploaded!"));
//             // return;


//             const newDog = new Dog({
//                 user_id: req.body.user_id,
//                 name: req.body.name,
//                 breed: req.body.breed,
//                 age_years: req.body.age_years,
//                 age_months: req.body.age_months,
//                 size: req.body.size,
//                 //profile_photo: req.file.path, //added for dog pic
//                 //profile_photo: filepath, //added for dog pic
//                 description: req.body.description,
//                 energy: req.body.energy,
//                 kid_friendly: req.body.kid_friendly,
//                 cat_friendly: req.body.cat_friendly,
//                 dog_friendly: req.body.dog_friendly,
//                 obedience: req.body.obedience,
//                 can_stay_home: req.body.can_stay_home,
//                 exercise_type: req.body.exercise_type,
//                 can_play_fetch: req.body.can_play_fetch,
//                 // photo_gallery: req.body.photo_gallery,
//                 // pd_counter: req.body.pd_counter
//             });

//             newDog.save();
//             res.send(`Dog is added`);
//         }
//         else {
//             //filepath = req.file.path
//             // //get uploaded file path
//             // const uploadedFilePath = '';
//             // console.log(req.file.path);
//             // if (req.file) {
//             //     uploadedFilePath = req.file.path;
//             //     console.log(uploadedFilePath)
//             // }


//             const newDog = new Dog({
//                 user_id: req.body.user_id,
//                 name: req.body.name,
//                 breed: req.body.breed,
//                 age_years: req.body.age_years,
//                 age_months: req.body.age_months,
//                 size: req.body.size,
//                 profile_photo: req.file.path, //added for dog pic
//                 //profile_photo: filepath, //added for dog pic
//                 description: req.body.description,
//                 energy: req.body.energy,
//                 kid_friendly: req.body.kid_friendly,
//                 cat_friendly: req.body.cat_friendly,
//                 dog_friendly: req.body.dog_friendly,
//                 obedience: req.body.obedience,
//                 can_stay_home: req.body.can_stay_home,
//                 exercise_type: req.body.exercise_type,
//                 can_play_fetch: req.body.can_play_fetch,
//                 // photo_gallery: req.body.photo_gallery,
//                 // pd_counter: req.body.pd_counter
//             });

//             newDog.save();
//             res.send(`Dog is added`);
//         }
//     }
//     catch (err) {
//         res.status(404).send(err);
//     }

// }

const addDog = (req, res, next) => {
    try {
        let ageYears;
        let ageMonths;

        let filepath;
        //get uploaded file
        if (!req.file) {
            // next(new Error("No file uploaded!"));
            // return;
            filepath = "";
        }
        else {
            filepath = req.file.path
        }

        if (req.body.age_years === 'null') {
            ageYears = 0
        }
        else {
            ageYears = req.body.age_years;
        }

        if (req.body.age_months === 'null') {
            ageMonths = 0
        }
        else {
            ageMonths = req.body.age_months;
        }

        const newDog = new Dog({
            user_id: req.body.user_id,
            name: req.body.name,
            breed: req.body.breed,
            // age_years: req.body.age_years,
            // age_months: req.body.age_months,
            age_years: ageYears,
            age_months: ageMonths,
            size: req.body.size,
            //profile_photo: req.file.path, //added for dog pic
            profile_photo: filepath, //added for dog pic
            description: req.body.description,
            energy: req.body.energy,
            kid_friendly: req.body.kid_friendly,
            cat_friendly: req.body.cat_friendly,
            dog_friendly: req.body.dog_friendly,
            obedience: req.body.obedience,
            can_stay_home: req.body.can_stay_home,
            exercise_type: req.body.exercise_type,
            can_play_fetch: req.body.can_play_fetch,
            // photo_gallery: req.body.photo_gallery,
            // pd_counter: req.body.pd_counter
        });

        newDog.save();
        res.send(`Dog is added`);

    }
    catch (err) {
        res.status(404).send(err);
    }

}



//get the dogs by user id
const getDogsByUserId = async (req, res, next) => {
    try {
        // console.log("dogs by owner")
        // console.log(req.body.user_id);

        // const Dogs = await Dog.find({ user_id: req.body.user_id });

        //console.log(req.params.user_id);

        const Dogs = await Dog.find({ user_id: req.params.user_id });
        //console.log(Dogs);
        res.json(Dogs);
    }
    catch (err) {
        res.status(404).send(err);
    }
}

module.exports = {
    getDogs,
    addDog,
    getDogsByUserId
};

//insert dogs by user id
// const addDog = (req, res, next) => {
//     try {

//         const newDog = new Dog({
//             user_id: req.body.user_id,
//             name: req.body.name,
//             breed: req.body.breed,
//             age_years: req.body.age_years,
//             age_months: req.body.age_months,
//             size: req.body.size,
//             // profile_photo: url, //added for dog pic
//             description: req.body.description,
//             energy: req.body.energy,
//             kid_friendly: req.body.kid_friendly,
//             cat_friendly: req.body.cat_friendly,
//             dog_friendly: req.body.dog_friendly,
//             obedience: req.body.obedience,
//             can_stay_home: req.body.can_stay_home,
//             exercise_type: req.body.exercise_type,
//             can_play_fetch: req.body.can_play_fetch,
//             // photo_gallery: req.body.photo_gallery,
//             // pd_counter: req.body.pd_counter
//         });

//         newDog.save();
//         res.send(`Dog is added`);
//     }
//     catch (err) {
//         res.status(404).send(err);
//     }
// }


// //insert dogs by user id
// const addDogProfilePic = async (req, res, next) => {
//     try {
//         //get uploaded file
//         if (!req.file) {
//             next(new Error("No file uploaded!"));
//             return;
//         }
//         else {
//             const userId = req.params.id;
//             const newDog = new Dog({
//                 user_id: userId,
//                 profile_photo: req.file.path,
//             });

//             newDog.save();
//             res.send(`Dog Profile Pic is added`);
//         }

//     }
//     catch (err) {
//         res.status(404).send(err);
//     }
// }

