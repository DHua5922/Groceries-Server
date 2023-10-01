const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");
const { secureMiddleware } = require("../middleware/auth");
const { deleteItemController } = require("../controllers/item");

module.exports = loggingMiddlewareAzureFunction(
  secureMiddleware(deleteItemController)
);
