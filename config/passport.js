const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');
const logger  = require('./winston')


passport.use(new LocalStrategy(function (username, password, done) {
    sequelize.models.user.findOne({ where: { username: username } })
        .then(function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'Invalid username or password'
                });
            }
            if (bcrypt.compareSync(password, user.password))
                return done(null, user);
            else
                return done(null, false, {
                    message: 'Invalid username or password'
                });
        })
        .catch(function (err) {
            logger.error("Error:", err);
            return done(err, false, {
                message: 'Something went wrong with your Signin'
            });
        })
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    sequelize.models.user.findOne({ where: { id: id } })
        .then(function (user) {
           return done(null, user);
        })
        .catch(function (err) {
            logger.error("Error:", err);
            return done(err, null);
        })
});

module.exports = passport;