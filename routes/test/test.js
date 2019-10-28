const router = require("express").Router();
const testController = require("../../controllers/testController");

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('Path is only avaialable to Authenticated Users!');
    }
}

router.get("/", isUserAuthenticated, testController.testMsg);

module.exports = router;