const router = require("express").Router();
const testRoutes = require("./test");


var myLogger = function (req, res, next) {
    console.log('Test Index');
    next();
  };
  
router.use(myLogger);

// Test routes
router.use("/test", testRoutes);

module.exports = router;
