const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");

function findUserByLoginDal(paramJson) {
  return sequelize.executeSQL(
    `
    DECLARE @statusCode bit;
    DECLARE @statusMessage nvarchar(255);
    EXEC findUserByLogin :value, @statusCode OUTPUT, @statusMessage OUTPUT;
    SELECT @statusCode AS statusCode, @statusMessage AS statusMessage;
    `,
    { type: QueryTypes.SELECT, replacements: paramJson }
  );
}

function getUserDal(paramJson) {
  return sequelize.executeStoredProcedure("EXEC getUser :id", paramJson, {
    type: QueryTypes.SELECT,
  });
}

function upsertUserDal(paramJson) {
  return sequelize.executeSQL(
    `
    DECLARE @statusCode bit;
    DECLARE @statusMessage nvarchar(255);
    EXEC upsertUser :id, :username, :email, :password, @statusCode OUTPUT, @statusMessage OUTPUT;
    SELECT @statusCode AS statusCode, @statusMessage AS statusMessage;
    `,
    { type: QueryTypes.UPSERT, replacements: paramJson }
  );
}

function deleteUserDal(paramJson) {
  return sequelize.executeSQL(
    `
    DECLARE @statusCode bit;
    DECLARE @statusMessage nvarchar(255);
    EXEC deleteUser :id, @statusCode OUTPUT, @statusMessage OUTPUT;
    SELECT @statusCode AS statusCode, @statusMessage AS statusMessage;
    `,
    { type: QueryTypes.DELETE, replacements: paramJson }
  );
}

module.exports = {
  findUserByLoginDal,
  getUserDal,
  upsertUserDal,
  deleteUserDal,
};
