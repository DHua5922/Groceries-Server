const sequelize = require("sequelize");

class Sequelize {
  constructor(database, server, domain, options = {}) {
    this.sequelize = new sequelize.Sequelize({
      dialect: "mssql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        authentication: {
          type: "default",
          options: {
            domain, // Your Windows domain (e.g., 'WORKGROUP')
          },
        },
      },
      server, // Your SQL Server instance name
      database, // Your database name
      options: {
        trustedConnection: true, // Use Windows authentication
      },
      ...options,
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
