const { Sequelize } = require("../utilities/database");

module.exports = {
  sequelize: new Sequelize(
    process.env.DATABASE,
    process.env.DB_SERVER,
    process.env.DB_DOMAIN
  ),
};
