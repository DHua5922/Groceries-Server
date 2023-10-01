const { logoutController } = require("../controllers/auth");
const { secureMiddleware } = require("../middleware/auth");
const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");

module.exports = loggingMiddlewareAzureFunction(
  secureMiddleware(logoutController)
);
