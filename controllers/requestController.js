//get the Request Schema
const Request = require('../models/Request');

//get requests
const getAllRequests = async (req, res, next) => {
    try {
        const requets = await Request.find();
        res.send(requets);
    }
    catch (err) {
        res.status(404).send(err);
    }
}

module.exports = {
    getAllRequests
};