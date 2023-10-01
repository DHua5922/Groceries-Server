const { findUserByLoginService } = require("../services/user");
const { BadRequestError, DefaultError } = require("../utilities/error");
const { JwtToken } = require("../utilities/token");
const { isMatchingPassword } = require("../utilities/password");
const {
  createTokenCookieAzureFunction,
  cookieExpireTime,
} = require("../utilities/cookie");

async function loginController(context, req) {
  try {
    const user = await findUserByLoginService(req.body.email);
    if (!user.statusCode) {
      throw new BadRequestError(user.statusMessage);
    }

    const isValidPassword = await isMatchingPassword(
      user.password,
      req.body.password
    );
    if (!isValidPassword) {
      throw new BadRequestError("Wrong password");
    }

    context.res = {
      status: 200,
      body: {
        email: user.email,
        name: user.name,
        token: JwtToken.create(
          { id: user.id },
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
        ),
      },
      cookies: [
        createTokenCookieAzureFunction(
          process.env.REFRESH_TOKEN_NAME,
          JwtToken.create(
            { id: user.id },
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
          ),
          process.env.ENV === "production",
          { expires: cookieExpireTime() }
        ),
      ],
    };
  } catch (err) {
    console.error(err);

    let error = new DefaultError("Cannot login");
    err instanceof BadRequestError && (error = err);

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

async function logoutController(context, req) {
  context.res = {
    status: 200,
    body: {},
    cookies: [
      createTokenCookieAzureFunction(
        process.env.REFRESH_TOKEN_NAME,
        "none",
        process.env.ENV === "production",
        { expires: new Date(Date.now() + 10 * 1000) }
      ),
    ],
  };
}

async function refreshTokenController(context, req) {
  try {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_NAME];
    const userId = JwtToken.decode(refreshToken).id;

    context.res = {
      status: 200,
      body: {
        accessToken: JwtToken.create(
          { id: userId },
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
        ),
      },
      cookies: [
        createTokenCookieAzureFunction(
          process.env.REFRESH_TOKEN_NAME,
          JwtToken.create(
            { id: userId },
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
          ),
          process.env.ENV === "production",
          { expires: cookieExpireTime() }
        ),
      ],
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot refresh access token");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

module.exports = {
  loginController,
  logoutController,
  refreshTokenController,
};
