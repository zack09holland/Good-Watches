require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth20');
const { User } = require('../models');
const passport = require('passport');
//const { Types } = require('mongoose');

    passport.serializeUser((user, cb) => {
        console.log("Serialize: " + user.id);
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        console.log("De-Serialize: " + id);
        User.findById(id).then((user) => {
            cb(null, user);    
        });
    });

    passport.use(new GoogleStrategy({
            clientID: process.env.googleOAuthClientID,
            clientSecret: process.env.googleOAuthClientSecret,
            callbackURL: process.env.googleOAuthCallbackURL
        },
        (token, refreshToken, profile, done) => {
            User.findOne( {authId: profile.id}).then((existingUser) => {
                if(existingUser){
                    //User already exist in DB
                    console.log('user is: ', existingUser);
                    done(null, existingUser);
                } else {
                    new User({
                        authId: profile.id
                    }).save().then((newUser) => {
                        console.log('created a new user: ', newUser);
                        done(null, newUser);
                    });
                }
            });
        })
    );