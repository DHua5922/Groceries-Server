const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");
const { secureMiddleware } = require("../middleware/auth");
const { upsertListController } = require("../controllers/list");

module.exports = loggingMiddlewareAzureFunction(
  secureMiddleware(upsertListController)
);
