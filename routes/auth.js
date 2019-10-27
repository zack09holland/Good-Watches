const router = require('express').Router();
const passport = require('passport');
const auth = require('../config/passport-init');

//auth(passport);
//router.use(passport.initialize());

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
        res.send('Connected')
    }
);

module.exports = router; 