const router = require('express').Router();
const passport = require('passport');
const auth = require('../config/passport-init');

router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        if(req.user){
            res.redirect('/test/test/user');
        } else {
            res.send('No User');
        }
    }
);

module.exports = router; 