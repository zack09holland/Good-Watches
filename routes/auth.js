const router = require('express').Router();
const passport = require('passport');
const auth = require('../config/passport-init');

//auth(passport);
//router.use(passport.initialize());


router.get('/test', 
    (req,res) => {
        console.log(req.body);
        res.send('test Path');
    }
);

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
            res.json({'user': req.user});
        } else {
            res.send('No User');
        }
    }
);

module.exports = router; 