const { UnauthorizedError, DefaultError } = require("../utilities/error");
const { getUserService } = require("../services/user");
const { JwtToken } = require("../utilities/token");

function secureMiddleware(controllerFn) {
  return async (context, req) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
      if (!token) {
        throw new UnauthorizedError("No token provided");
      }

      const decodedToken = JwtToken.decode(token);

      return controllerFn(context, {
        ...req,
        user: await getUserService(decodedToken.id),
      });
    } catch (err) {
      console.error(err);

      let error = new DefaultError("Cannot authenticate user");
      (err.message === "jwt expired" || err instanceof UnauthorizedError) &&
        (error = new UnauthorizedError(err.message));

      context.res = {
        status: error.status,
        body: error.message,
      };
    }
  };
}

module.exports = {
  secureMiddleware,
};
