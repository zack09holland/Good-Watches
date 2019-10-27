const router = require("express").Router();

router.get("/", 
    (req,res) => res.send('Test API that is Killing me')
);

module.exports = router;