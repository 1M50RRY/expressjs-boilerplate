var models = require('../models');

/**
 * Gets user from database by email
 * @module functions
 * @async
 * @param {string} email - Email
 * @returns {object}
*/
exports.getUserByEmail = async email => await models.User.findOne({ where: { email: email } });

/**
 * Gets user from database by id
 * @module functions
 * @async
 * @param {integer} id - id
 * @returns {object}
*/
exports.getUserById = async id => await models.User.findOne({ where: { id: id } });


/**
 * Updates user data by id
 * @module functions
 * @async
 * @param {integer} id - id
 * @param {json} updatedData - Updated data
 * @returns {object}
*/
exports.updateUserById = async (updatedData, id) => await models.User.update(updatedData, { where: { id: id } });


