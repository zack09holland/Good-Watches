const router = require("express").Router();
const testRoutes = require("./test");

// Book routes
router.use("/test", testRoutes);

module.exports = router;
