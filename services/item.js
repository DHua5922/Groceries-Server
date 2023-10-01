const { getItemDal, upsertItemDal, deleteItemDal } = require("../dal/item");

function getItemService(id) {
  return getItemDal({ id });
}

async function upsertItemService(params) {
  const items = await upsertItemDal(params);
  const lastIndex = items[0].length - 1;
  return {
    ...items[0].slice(0, lastIndex),
    ...items[0][lastIndex],
  };
}

async function deleteItemService(id) {
  const items = await deleteItemDal({ id });
  return items[0];
}

module.exports = {
  getItemService,
  upsertItemService,
  deleteItemService,
};
