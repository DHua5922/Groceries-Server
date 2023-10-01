function parseCookie(cookieString) {
  return cookieString.split("; ").reduce((parsedCookie, cookieString) => {
    const parsedString = cookieString.split("=");
    parsedCookie[parsedString[0]] = parsedString[1];
    return parsedCookie;
  }, {});
}

function createTokenCookieAzureFunction(
  name,
  token,
  isProductionEnv,
  options = {}
) {
  const envConfig = isProductionEnv
    ? {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      }
    : {};
  return {
    ...envConfig,
    ...options,
    name,
    value: token,
  };
}

function cookieExpireTime() {
  return new Date(
    new Date().getTime() +
      1000 * 60 * 60 * 24 * parseInt(process.env.COOKIE_EXPIRE_TIME) * 10
  );
}

module.exports = {
  parseCookie,
  createTokenCookieAzureFunction,
  cookieExpireTime,
};
