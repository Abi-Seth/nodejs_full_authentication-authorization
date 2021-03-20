const mongoose = require('mongoose');

/**
 * @param {*} id
 * @returns {boolean} true/false
 */ 

exports.isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)