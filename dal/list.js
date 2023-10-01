const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");

function getListDal(paramJson) {
  return sequelize.executeStoredProcedure("EXEC getList :id", paramJson, {
    type: QueryTypes.SELECT,
  });
}

function upsertListDal(paramJson) {
  return sequelize.executeSQL(
    `
    DECLARE @statusCode bit;
    DECLARE @statusMessage nvarchar(255);
    EXEC upsertList :id, :name, :sequence, :userId, @statusCode OUTPUT, @statusMessage OUTPUT;
    SELECT @statusCode AS statusCode, @statusMessage AS statusMessage;
    `,
    { type: QueryTypes.UPSERT, replacements: paramJson }
  );
}

function deleteListDal(paramJson) {
  return sequelize.executeSQL(
    `
    DECLARE @statusCode bit;
    DECLARE @statusMessage nvarchar(255);
    EXEC deleteList :id, @statusCode OUTPUT, @statusMessage OUTPUT;
    SELECT @statusCode AS statusCode, @statusMessage AS statusMessage;
    `,
    { type: QueryTypes.DELETE, replacements: paramJson }
  );
}

module.exports = {
  getListDal,
  upsertListDal,
  deleteListDal,
};
