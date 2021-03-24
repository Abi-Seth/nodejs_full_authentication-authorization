const { userModel, userValidation } = require('../models/user.model');
const _ = require('lodash');

exports.addUser = async (req, res) => {
    try {
        const user = req.body;

        const validateUser = await userValidation(user);
        if (validateUser.error) {
            return res.send({
                success: false,
                status: 400,
                message: error.details[0].message
            }).status(400)
        }

        const duplicateCheck = await userModel.findOne({email: user.email});

        if (duplicateCheck) {
            return res.send({
                success: false,
                status: 403,
                message: 'User with email already exists!'
            }).status(403)
        }

    } catch(err) {
        res.send({
            success: false,
            status: 400,
            message: err.message
        }).status(400)
    }
}