require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth20');

module.exports = (passport) => {
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
      
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
    passport.use(new GoogleStrategy({
            clientID: process.env.googleOAuthClientID,
            clientSecret: process.env.googleOAuthClientSecret,
            callbackURL: process.env.googleOAuthCallbackURL
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
}; 