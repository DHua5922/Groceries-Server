const { parseCookie } = require("./cookie");
const intercept = require("azure-function-log-intercept");

function cookieMiddlewareAzureFunction(controllerFn) {
  return (context, req) =>
    controllerFn(context, {
      ...req,
      cookies: parseCookie(req.headers["cookie"]),
    });
}

function loggingMiddlewareAzureFunction(controllerFn) {
  return (context, req) => {
    intercept(context);
    return controllerFn(context, req);
  };
}

module.exports = {
  cookieMiddlewareAzureFunction,
  loggingMiddlewareAzureFunction,
};
