const { Sequelize } = require("../utilities/database");

module.exports = {
  sequelize: new Sequelize(
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DATABASE,
    process.env.DB_HOST
  ),
};
