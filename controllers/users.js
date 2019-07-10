var { User } = require('../models');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
var { getUserByEmail, getUserById, updateUserById } = require('../functions/db');
const { secret } = require('../middleware/passport');

/**
 * Registers an user
 * @async
 * @module controllers/users
 * @param {file}   avatar - Avatar.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {json}
*/
exports.register = async (req, res, next) => {
    let ip = req.headers['x-forwarded-for'];
    let existingUser = await getUserByEmail(req.body.email);
    if (existingUser === []) {
        User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: '/images/' + req.file.filename,
            ip: ip
        }).then(user => res.json({ status: 'OK' }));
    }
    else
        res.json({
            status: 'FAIL',
            message: "User with this email already exists."
        });
};

/**
 * Authenticates an user
 * @module controllers/users
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {json}
*/
exports.login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json(info);
        }
        req.login(user, { session: false }, (err) => {
            if (err)
                res.send(err);
            const token = jwt.sign(user.toJSON(), secret, { expiresIn: 604800 });
            return res.json(Object.assign(info, { user, token }));
        });
    })(req, res);
};

/**
 * Gets user by id
 * @module controllers/users
 * @param {integer} id - Id
 * @returns {json}
*/
exports.getInfo = (req, res, next) => {
    getUserById(req.params.id).then(user => res.json(user.toJSON()));
};
