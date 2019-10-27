const router = require("express").Router();

router.get("/test", 
    (req,res) => res.send('Test API that is Killing me')
);

module.exports = router;