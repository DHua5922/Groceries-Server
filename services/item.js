const { getItemDal, upsertItemDal, deleteItemDal } = require("../dal/item");

async function getItemService(id) {
  const idNum = Number(id);
  const result = await getItemDal({ id: idNum });
  return idNum ? result[0] : result;
}

async function upsertItemService(params) {
  const result = await upsertItemDal(params);
  const lastIndex = result[0].length - 1;
  return {
    ...result[0].slice(0, lastIndex),
    ...result[0][lastIndex],
  };
}

async function deleteItemService(id) {
  const result = await deleteItemDal({ id: Number(id) });
  return result[0][0];
}

module.exports = {
  getItemService,
  upsertItemService,
  deleteItemService,
};
