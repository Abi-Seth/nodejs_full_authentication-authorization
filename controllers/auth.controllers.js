const bcrypt = require('bcrypt');
const { loginValidation, userModel } = require('../models/user.model');

exports.login = async (req, res) => {
    try {
        const userDetails = req.body;

        const validateUserDetails = await loginValidation(userDetails);
        if (validateUserDetails.error) {
            return res.send({
                success: false,
                status: 400,
                message: validateUserDetails.error.details[0].message
            }).status(400)
        }

        let user = await userModel.findOne({ email: userDetails.email });
        if (!user) {
            return res.send({
                success: false,
                status: 400,
                message: 'Invalid email or password!'
            }).status(400)
        }

        const validPassword = await bcrypt.compare(userDetails.password, user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                status: 401,
                message: 'Invalid email or password!'
            }).status(401)
        }
        console.log(user);
        return res.send({
            success: true,
            status: 200,
            message: user.generateAuthToken()
        }).status(200)

    } catch (err) {
        res.send({
            success: false,
            status: 400,
            message: err.message
        }).status(400)
    }
}