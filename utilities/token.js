const jwt = require("jsonwebtoken");

class JwtToken {
  constructor(secret) {
    this.secret = secret;
  }

  create({ iat, exp, ...payload }, options = {}) {
    return jwt.sign(payload, this.secret, options);
  }

  decode(token, options = {}) {
    return jwt.verify(token, this.secret, options);
  }
}

module.exports = { JwtToken: new JwtToken(process.env.JWT_SECRET) };
