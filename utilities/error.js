class DefaultError extends Error {
  static status = 500;

  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends DefaultError {
  static status = 400;

  constructor(message) {
    super(message, 400);
  }
}

class UnauthorizedError extends DefaultError {
  static status = 401;

  constructor(message) {
    super(message, 401);
  }
}

class ForbiddenError extends DefaultError {
  static status = 403;

  constructor(message) {
    super(message, 403);
  }
}

class NotFoundError extends DefaultError {
  static status = 404;

  constructor(message) {
    super(message, 404);
  }
}

module.exports = {
  BadRequestError,
  DefaultError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
