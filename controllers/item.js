const {
  getItemService,
  upsertItemService,
  deleteItemService,
} = require("../services/item");
const { DefaultError, BadRequestError } = require("../utilities/error");

async function getItemController(context, req) {
  try {
    context.res = {
      status: 200,
      body: await getItemService(req.params.id),
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot get item(s)");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

async function upsertItemController(context, req) {
  try {
    const user = await upsertItemService(req.body);
    if (!user.statusCode) {
      throw new BadRequestError(user.statusMessage);
    }

    context.res = {
      status: 200,
      body: user,
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot upsert item");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

async function deleteItemController(context, req) {
  try {
    const user = await deleteItemService(req.body);
    if (!user.statusCode) {
      throw new BadRequestError(user.statusMessage);
    }

    context.res = {
      status: 200,
      body: user,
    };
  } catch (err) {
    console.error(err);

    const error = new DefaultError("Cannot delete item");

    context.res = {
      status: error.status,
      body: error.message,
    };
  }
}

module.exports = {
  getItemController,
  upsertItemController,
  deleteItemController,
};
