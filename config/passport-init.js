require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth20');
const TwitterStrategy = require('passport-twitter');

const { User } = require('../models');
const passport = require('passport');
//const { Types } = require('mongoose');

    passport.serializeUser((user, cb) => {
        console.log("Serialize: " + user.id);
        cb(null, {
            authId: user.id, 
            authProvider: user.authProvider
        });
    });

    passport.deserializeUser((user, cb) => {
        console.log("De-Serialize: " + user.authId);
        User.findById(user.authId).then((user) => {
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
                console.log('User Found: ', existingUser);
                done(null, existingUser);
            } else {
                new User({
                    authId: profile.id,
                    authProvider: "google"
                }).save().then((newUser) => {
                    console.log('Created a New User: ', newUser);
                    done(null, newUser);
                });
            }
        });
    }));

    passport.use(new TwitterStrategy({
        consumerKey: process.env.twitterOAuthAPIKey,
        consumerSecret: process.env.twitterOAuthAPISecretKey,
        callbackURL: process.env.twitterOAuthCallback,
        profileFields: ['id']
      },
      (accesstoken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne( {authId: profile.id}).then((existingUser) => {
            if(existingUser){
                //User already exist in DB
                console.log('User Found: ', existingUser);
                done(null, existingUser);
            } else {
                new User({
                    authId: profile.id,
                    authProvider: "twitter"
                }).save().then((newUser) => {
                    console.log('Created a New User: ', newUser);
                    done(null, newUser);
                });
            }
        });
    }));