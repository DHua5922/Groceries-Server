const { getListDal, upsertListDal, deleteListDal } = require("../dal/list");

function getListService(id) {
  return getListDal({ id });
}

async function upsertListService(params) {
  const lists = await upsertListDal(params);
  const lastIndex = lists[0].length - 1;
  return {
    ...lists[0].slice(0, lastIndex),
    ...lists[0][lastIndex],
  };
}

async function deleteListService(id) {
  const lists = await deleteListDal({ id });
  return lists[0];
}

module.exports = {
  getListService,
  upsertListService,
  deleteListService,
};
