const mongoose = require('mongoose');
const Joi = require('joi');

const provinceSchema = new mongoose.Schema({
    provinceName: {
        type: String,
        required: true,
        unique: true
    },
    provinceHead: {
        type: String,
        required: true,
    },
    provinceHeadEmail: {
        type: String,
        required: true,
    },
    provinceSize: {
        type: Number,
        required: true
    },
    provinceNumberOfDistricts: {
        type: Number,
        required: true
    }
}, { timestamps: true })

exports.provinceValidation = (body) => {
    const validateProvinceSchema = Joi.object({
        provinceName: Joi.string().max(20).min(2).required(),
        provinceHead: Joi.string().max(45).min(3).required(),
        provinceHeadEmail: Joi.string().max(45).min(10).required().email(),
        provinceSize: Joi.number().required(),
        provinceNumberOfDistricts: Joi.number().required()
    })
    return validateProvinceSchema.validate(body);
}

exports.provinceModel = mongoose.model('Province', provinceSchema);

