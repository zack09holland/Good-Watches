const router = require("express").Router();
const testRoutes = require("./test");

// Test routes
router.use("/test", testRoutes);

module.exports = router;
