const { getListDal, upsertListDal, deleteListDal } = require("../dal/list");

async function getListService(id) {
  const idNum = Number(id);
  const result = await getListDal({ id: idNum });
  return idNum ? result[0] : result;
}

async function upsertListService(params) {
  const result = await upsertListDal(params);
  const lastIndex = result[0].length - 1;
  const list = result[0].slice(0, lastIndex);
  const status = result[0][lastIndex];
  return {
    ...list[0],
    ...status,
  };
}

async function deleteListService(id) {
  const result = await deleteListDal({ id: Number(id) });
  return result[0];
}

module.exports = {
  getListService,
  upsertListService,
  deleteListService,
};
