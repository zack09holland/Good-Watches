require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth20');

module.exports = (passport) => {
    passport.serializeUser(function(user, cb) {
        console.log("Serialize: ");
        console.log(user);
        cb(null, user);
    });

    passport.deserializeUser(function(user, cb) {
        console.log("De-Serialize: ");
        console.log(user);
        cb(null, user);
    });

    passport.use(new GoogleStrategy({
            clientID: process.env.googleOAuthClientID,
            clientSecret: process.env.googleOAuthClientSecret,
            callbackURL: process.env.googleOAuthCallbackURL
        },
        (token, refreshToken, profile, done) => {

            console.log("Profile: ");
            console.log(profile);
            return done(null, {
                user: profile.id,
                token: token
            });
        }));
}; 