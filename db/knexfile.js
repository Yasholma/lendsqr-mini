require("dotenv").config();

const defaults = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Mysql@6776",
    database: process.env.DB_NAME || "lendsqr_mini",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    ...defaults,
    debug: true,
    useNullAsDefault: true,
  },
};
