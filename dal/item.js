const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");

function getItemDal(paramJson) {
  return sequelize.executeStoredProcedure("EXEC getItem :id", paramJson, {
    type: QueryTypes.SELECT,
  });
}

function upsertItemDal(paramJson) {
  return sequelize.executeSQL(
    `
    DECLARE @statusCode bit;
    DECLARE @statusMessage nvarchar(255);
    EXEC upsertItem :id, :name, :price, :sequence, :listId, @statusCode OUTPUT, @statusMessage OUTPUT;
    SELECT @statusCode AS statusCode, @statusMessage AS statusMessage;
    `,
    { type: QueryTypes.UPSERT, replacements: paramJson }
  );
}

function deleteItemDal(paramJson) {
  return sequelize.executeSQL(
    `
    DECLARE @statusCode bit;
    DECLARE @statusMessage nvarchar(255);
    EXEC deleteItem :id, @statusCode OUTPUT, @statusMessage OUTPUT;
    SELECT @statusCode AS statusCode, @statusMessage AS statusMessage;
    `,
    { type: QueryTypes.DELETE, replacements: paramJson }
  );
}

module.exports = {
  getItemDal,
  upsertItemDal,
  deleteItemDal,
};
