const router = require('express').Router();
const passport = require('passport');
require('../config/passport-init');

// Express Route used to answer on /auth/google ---> Sends client to Google for Authentication
router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    })
);

// Express Route used to recieve the Auth google callback response
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',

    }),
    (req, res) => {
        if(req.isAuthenticated()){
            res.redirect('/');
        } else {
            res.send('No User');
        }
    }
);

module.exports = router; 