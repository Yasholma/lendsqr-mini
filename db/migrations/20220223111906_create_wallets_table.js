const { SCHEMAS } = require("../schema.constant");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(SCHEMAS.Wallet, (table) => {
    table.increments("id");
    table.float("balance").defaultTo(0);
    table
      .integer("userId")
      .unsigned()
      .index()
      .references("id")
      .inTable(SCHEMAS.User)
      .unique();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(SCHEMAS.Wallet);
};
