const { provinceModel, provinceValidation } = require('../models/provinces.model');
const { isValidObjectId } = require('../utils/imports');

exports.addProvince = async (req, res) => {
    try {
        const province = req.body;

        const validProvince = await provinceValidation(province);
        if (validProvince.error)
            return res.status(400).send(validProvince.error.details[0].message);
        
        const duplicate = await provinceModel.findOne({ provinceName: province.provinceName });
        if (duplicate) {
            return res.send({
                success: false,
                status: 403,
                message: 'Province already exists.'
            }).status(403)
        }

        const newProvince = await provinceModel(province);

        await newProvince.save()
        .then(() => {
            res.send({
                success: true,
                status: 201,
                message: 'Province added successfully.',
                newProvince
            }).status(201)
        })
        .catch((err) => { 
            res.send(err.message)
        })
 
    }catch(err) {
        res.send({
            success: false,
            status: 400,
            message: err.message
        }).status(400)
    }
} 

exports.getAllProvinces = async (req, res) => {
    try {
        const provinces = await provinceModel.find()

        res.send({
            success: true,
            status: 200,
            provinces
        }).status(200)
    }catch(err) {
        res.send({
            success: false,
            status: 400,
            message: err.message
        }).status(400)
    }
}

exports.getProvinceById = async (req, res) => {
    try {
        const provinceId = req.params.id;

        if (provinceId) {
            const province = await provinceModel.findById(provinceId);
            res.send({
                success: true,
                status: 200,
                province
            }).status(200)
        }

    }catch(err) {
        res.send({
            success: false,
            status: 406,
            message: 'Invalid id && ' + err.message
        }).status(406)
    }
} 

exports.updateProvince = async (req, res) => {
    try {
        const provinceId = req.params.id;
        let province;

        province = await provinceModel.findById(provinceId)
        if (!province) {
            return res.send({
                success: false,
                status: 404,
                message: 'Province not found!'
            }).status(404)
        }

        const duplicate = await provinceModel.findOne({
            _id: {
                $ne: req.params.id
            },
            provinceName: province.provinceName
        })

        if (duplicate) {
            return res.send({
                success: false,
                status: 403,
                message: 'Province name already exists!'
            }).status(403)
        }

        const { provinceName, provinceHead, provinceHeadEmail, provinceSize, provinceNumberOfDistricts } = req.body
        if (provinceName)
            province.provinceName = provinceName;
        
        if (provinceHead)
            province.provinceHead = provinceHead
            
        if (provinceHeadEmail)
            province.provinceHeadEmail = provinceHeadEmail
            
        if (provinceSize)
            province.provinceSize = provinceSize
        
        if (provinceNumberOfDistricts)
            province.provinceNumberOfDistricts = provinceNumberOfDistricts

        await province.save()
        .then(() => {
            res.send({
                success: true,
                status: 200,
                message: 'Province updated successfully',
                province
            }).status(200)
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 400,
                message: err.message
            }).status(400)
        })
 
    } catch(err) {
        res.send({
            success: false,
            status: 406,
            message: 'Invalid id && ' + err.message
        }).status(406)
    }
}

exports.deleteProvince = async (req, res) => {
    try {
        const provinceId = req.params.id;
        let province;

        const isValidId = await isValidObjectId(provinceId)
        if (!isValidId) {
            return res.send({
                success: false,
                status: 400,
                message: 'Invalid id!'
            }).status(400)
        }

        province = await provinceModel.findById(provinceId)

        if (!province) {
            return res.send({
                success: false,
                status: 404,
                message: 'Province not found!'
            }).status(404)
        }

        await provinceModel.findByIdAndDelete(provinceId)
        .then(() => {
            res.send({
                success: true,
                status: 200,
                message: 'Province deleted successfully'
            }).status(200)
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 400,
                message: err.message
            }).status(400)
        })

    } catch(err) {
        res.send({
            success: false,
            status: 406,
            message: 'Invalid id && ' + err.message
        }).status(406)
    }
}