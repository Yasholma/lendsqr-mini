require("dotenv").config();
const defaultConfig = require("../config/knex");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    ...defaultConfig,
    connection: {
      ...defaultConfig.connection,
      database: process.env.DB_NAME || "lendsqr_mini",
    },
    debug: true,
  },
  test: {
    ...defaultConfig,
    connection: {
      ...defaultConfig.connection,
      database: process.env.TEST_DB_NAME || "lendsqr_mini_test",
    },
  },
};
