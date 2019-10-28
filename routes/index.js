const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const testRoutes = require("./test");
const authRoutes = require("./auth");


// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.send('Path is only avaialable to Authenticated Users!');
  }
}

// // API Routes
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);
router.use("/test", isUserAuthenticated, testRoutes);

// If no API routes are hit, send the React app
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
