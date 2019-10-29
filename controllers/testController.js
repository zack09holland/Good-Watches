module.exports = {
    testMsg: function(req,res){
        console.log(req.user, 'asldhfwevakljedgfapoiuvawdv');
        res.json({'user' : req.user});
    }
};