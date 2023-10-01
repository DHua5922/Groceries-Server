const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");
const { secureMiddleware } = require("../middleware/auth");
const { getListController } = require("../controllers/list");

module.exports = loggingMiddlewareAzureFunction(
  secureMiddleware(getListController)
);
