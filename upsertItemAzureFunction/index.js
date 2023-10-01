const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");
const { secureMiddleware } = require("../middleware/auth");
const { upsertItemController } = require("../controllers/item");

module.exports = loggingMiddlewareAzureFunction(
  secureMiddleware(upsertItemController)
);
