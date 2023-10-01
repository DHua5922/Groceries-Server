const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");
const { secureMiddleware } = require("../middleware/auth");
const { deleteListController } = require("../controllers/list");

module.exports = loggingMiddlewareAzureFunction(
  secureMiddleware(deleteListController)
);
