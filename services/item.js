const { getItemDal, upsertItemDal, deleteItemDal } = require("../dal/item");

async function getItemService(id) {
  const idNum = Number(id);
  const result = await getItemDal({ id: idNum });
  return idNum ? result[0] : result;
}

async function upsertItemService(params) {
  const result = await upsertItemDal(params);
  const lastIndex = result[0].length - 1;
  const list = result[0].slice(0, lastIndex);
  const status = result[0][lastIndex];
  return {
    ...list[0],
    ...status,
  };
}

async function deleteItemService(id) {
  const result = await deleteItemDal({ id: Number(id) });
  return result[0];
}

module.exports = {
  getItemService,
  upsertItemService,
  deleteItemService,
};
