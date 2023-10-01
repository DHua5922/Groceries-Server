const {
  getUserService,
  upsertUserService,
  deleteUserService,
} = require("../services/user");
const { DefaultError, BadRequestError } = require("../utilities/error");

async function getUserController(context, req) {
  try {
    context.res = {
      status: 200,
      body: await getUserService(req.params.id),
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot get user(s)");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

async function upsertUserController(context, req) {
  try {
    const user = await upsertUserService(req.body);
    if (!user.statusCode) {
      throw new BadRequestError(user.statusMessage);
    }

    context.res = {
      status: 200,
      body: user,
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot upsert user");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

async function deleteUserController(context, req) {
  try {
    const user = await deleteUserService(req.body);
    if (!user.statusCode) {
      throw new BadRequestError(user.statusMessage);
    }

    context.res = {
      status: 200,
      body: user,
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot delete user");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

module.exports = {
  getUserController,
  upsertUserController,
  deleteUserController,
};
