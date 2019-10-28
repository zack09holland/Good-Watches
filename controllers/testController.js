module.exports = {
    testMsg: function(req,res){
        res.json({'user' : req.user});
    }
};