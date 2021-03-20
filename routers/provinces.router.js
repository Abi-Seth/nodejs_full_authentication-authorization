const express = require('express');
const provinceRouter = express.Router();

const { addProvince, getAllProvinces, getProvinceById, updateProvince, deleteProvince} = require('../controllers/provinces.controllers');

provinceRouter.post('/', addProvince);
provinceRouter.get('/getAllProvinces', getAllProvinces);
provinceRouter.get('/getProvinceById/:id', getProvinceById);
provinceRouter.put('/updateProvince/:id', updateProvince);
provinceRouter.delete('/deleteProvince/:id', deleteProvince);

module.exports = provinceRouter;