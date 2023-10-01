const { refreshTokenController } = require("../controllers/auth");
const {
  loggingMiddlewareAzureFunction,
  cookieMiddlewareAzureFunction,
} = require("../utilities/middleware");

module.exports = loggingMiddlewareAzureFunction(
  cookieMiddlewareAzureFunction(refreshTokenController)
);
