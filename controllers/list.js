const {
  getListService,
  upsertListService,
  deleteListService,
} = require("../services/list");
const { DefaultError, BadRequestError } = require("../utilities/error");

async function getListController(context, req) {
  try {
    context.res = {
      status: 200,
      body: await getListService(req.params.id),
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot get list(s)");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

async function upsertListController(context, req) {
  try {
    const user = await upsertListService(req.body);
    if (!user.statusCode) {
      throw new BadRequestError(user.statusMessage);
    }

    context.res = {
      status: 200,
      body: user,
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot upsert list");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

async function deleteListController(context, req) {
  try {
    const user = await deleteListService(req.body);
    if (!user.statusCode) {
      throw new BadRequestError(user.statusMessage);
    }

    context.res = {
      status: 200,
      body: user,
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot delete list");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

module.exports = {
  getListController,
  upsertListController,
  deleteListController,
};
