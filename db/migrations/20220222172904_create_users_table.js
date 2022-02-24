const { SCHEMAS } = require("../schema.constant");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(SCHEMAS.User, (table) => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("password", 255).notNullable();
    table.enum("role", ["admin", "user"]).defaultTo("user");
    table.string("token", 255).nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(SCHEMAS.User);
};
