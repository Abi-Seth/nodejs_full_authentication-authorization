const mongoose = require('mongoose');
const joi = require('joi');

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
    provinceSize: {
        type: Number,
        required: true
    },
    provinceNumberOfDistricts: {
        type: Number,
        required: true
    }
}, { timestamps: true })



