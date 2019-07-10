const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { getUserByEmail } = require('../functions/db');
var bcrypt = require('bcrypt');
const secret = 'ashdyuT%@#g162Yysadt)@&3';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, cb) => {
        return getUserByEmail(email)
            .then(user => {
                
                if (!bcrypt.compareSync(password, user.password)) {
                    return cb(null, false, { status: 'FAIL', message: 'Incorrect email or password.' });
                }
                user.password = null;

                return cb(null, user, { status: 'OK', message: 'Logged In Successfully' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
},
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return getUserByEmail(jwtPayload.email)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

module.exports = { secret };