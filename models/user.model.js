const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 3
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign(
        {
            _id: this._id,
            Username: this.Username,
            email: this.email,
            isAdmin: this.isAdmin
        }, config.get('jwtPrivateKey')
    );
    return token;
}

exports.loginValidation = (body) => {
    const validateLogin = Joi.object({
        email: Joi.string().max(255).min(3).required().email(),
        password: Joi.string().max(255).min(3).required()
    })
    return validateLogin.validate(body);
}

exports.userValidation = (body) => {
    const validateUserSchema = Joi.object({
        Username: Joi.string().max(255).min(3).required(),
        email: Joi.string().max(255).min(3).required().email(),
        password: Joi.string().max(255).min(3).required(),
        isAdmin: Joi.required()
    })
    return validateUserSchema.validate(body);
}

exports.userModel = mongoose.model('User', userSchema);