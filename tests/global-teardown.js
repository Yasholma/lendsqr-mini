const Knex = require("knex");

const database = "lendsqr_mini_test";

const knex = Knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Mysql@6776",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "db/migrations",
  },
});

module.exports = async () => {
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
