var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var multer = require('../config/storage');
const passport = require('passport');
require('../middleware/passport');

/* PUT new user */
router.put('/register', multer.upload.single('avatar'), users.register);

/* POST log into user account */
router.post('/login', users.login);

/* GET user by id */
router.get('/get/:id', passport.authenticate('jwt', {session: false}), users.getInfo);

module.exports = router;
