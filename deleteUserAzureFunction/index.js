const { deleteUserController } = require("../controllers/user");
const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");
const { secureMiddleware } = require("../middleware/auth");

module.exports = loggingMiddlewareAzureFunction(
  secureMiddleware(deleteUserController)
);
