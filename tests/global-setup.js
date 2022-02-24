const Knex = require("knex");
const defaultConfig = require("../config/knex");

const database = "lendsqr_mini_test";

async function createTestDatabase() {
  const knex = Knex({
    ...defaultConfig,
  });

  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`);
    await knex.raw(`CREATE DATABASE ${database}`);
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

async function migrateDatabase() {
  const knex = Knex({
    ...defaultConfig,
    connection: {
      ...defaultConfig.connection,
      database: process.env.TEST_DB_NAME || "lendsqr_mini_test",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "db/migrations",
    },
    seeds: {
      directory: "db/seeds",
    },
  });

  try {
    await knex.migrate.latest();
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

module.exports = async () => {
  try {
    await createTestDatabase();
    await migrateDatabase();
    console.log("Test database created successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
