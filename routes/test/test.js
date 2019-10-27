const router = require("express").Router();
const testController = require("../../controllers/testController");

router.get("/", testController.testMsg);

module.exports = router;