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

//insert dogs by user id
const addDog = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const newDog = new Dog({
            user_id: userId,
            name: req.body.name,
            breed: req.body.breed,
            age_years: req.body.age_years,
            age_months: req.body.age_months,
            sie: req.body.size,
            profile_photo: req.body.profile_photo,
            description: req.body.description,
            energy: req.body.energy,
            kid_friendly: req.body.kid_friendly,
            cat_friendly: req.body.cat_friendly,
            dog_friendly: req.body.dog_friendly,
            obedience: req.body.obedience,
            can_stay_home: req.body.can_stay_home,
            exercise_type: req.body.exercise_type,
            can_play_fetch: req.body.can_play_fetch,
            photo_gallery: req.body.photo_gallery,
            pd_counter: req.body.pd_counter
        });

        newDog.save();
        res.send(`Dog is added`);
    }
    catch (err) {
        res.status(404).send(err);
    }
}

module.exports = {
    getDogs,
    addDog,
};