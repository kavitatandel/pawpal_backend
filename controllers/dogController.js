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

module.exports = {
    getDogs
};