const { loginController } = require("../controllers/auth");
const { loggingMiddlewareAzureFunction } = require("../utilities/middleware");

module.exports = loggingMiddlewareAzureFunction(loginController);
