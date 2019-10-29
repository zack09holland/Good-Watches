const router = require("express").Router();
const testController = require("../../controllers/testController");

// Middleware to check if the user is authenticated


function isUserAuthenticated(req, res, next) {
    console.log(req)
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send('Path is only avaialable to Authenticated Users!');
    }
}
router.get("/user", testController.testMsg);
router.get("/*", isUserAuthenticated, testController.testMsg);

module.exports = router;