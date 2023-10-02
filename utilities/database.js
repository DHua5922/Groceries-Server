const sequelize = require("sequelize");

class Sequelize {
  constructor(username, password, database, host, options = {}) {
    this.sequelize = new sequelize.Sequelize({
      dialect: "mssql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      ...options,
      username,
      password,
      database,
      host,
    });
  }

  async executeSQL(sqlString, options) {
    await this.sequelize.authenticate();
    return this.sequelize.query(sqlString, options);
  }

  executeStoredProcedure(sqlString, valuesJson, queryType) {
    return this.executeSQL(sqlString, {
      replacements: valuesJson,
      type: queryType,
    });
  }
}

module.exports = { Sequelize };
