module.exports = {
    testMsg: function(req,res){
        //console.log(req);
        //console.log('Current Token: ' + req.session.passport.user.token);
        //console.log('Current User Id: ' + req.session.passport.user.profile.id);
        //console.log(req.user, 'asldhfwevakljedgfapoiuvawdv');
        res.json({'user' : req.user});
    }
};