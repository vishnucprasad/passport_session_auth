const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

const initializePassport = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function verify(email, password, cb) {
        User.findOne({ email: email }, async function (err, user) {
            if (err) return cb(err);
            if (!user) return cb(null, false, { message: 'Incorrect username or password.' });

            const match = await user.isValidPassword(password);

            if (!match) return cb(null, false, { message: 'Incorrect username or password.' });

            return cb(null, user);
        });
    }));

    passport.serializeUser(function (user, cb) {
        cb(null, { id: user.id });
    });

    passport.deserializeUser(async function (user, cb) {
        User.findById(user.id, function (e, user) {
            return cb(null, user);
        });
    });
}

module.exports = initializePassport;