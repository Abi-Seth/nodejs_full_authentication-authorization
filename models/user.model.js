const Joi = require('joi');
const mongoose = require('mongoose');

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
    isAdmin:{
        type: Boolean,
        default:false,
        required:true
    }
}, { timestamps: true });

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