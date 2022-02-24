module.exports = {
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
  seeds: {
    directory: "db/seeds",
  },
};
