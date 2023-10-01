const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");
const { secureMiddleware } = require("../middleware/auth");
const { getItemController } = require("../controllers/item");

module.exports = loggingMiddlewareAzureFunction(
  secureMiddleware(getItemController)
);
