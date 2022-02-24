const { SCHEMAS } = require("../schema.constant");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(SCHEMAS.WalletTransaction, (table) => {
    table.increments("id");
    table
      .integer("sourceWallet")
      .unsigned()
      .index()
      .references("id")
      .inTable(SCHEMAS.Wallet);
    table
      .integer("destinationWallet")
      .unsigned()
      .index()
      .references("id")
      .inTable(SCHEMAS.Wallet);
    table.float("amount").notNullable();
    table.enum("type", ["fund", "withdraw", "transfer"]).notNullable();
    table
      .integer("userId")
      .unsigned()
      .index()
      .references("id")
      .inTable(SCHEMAS.User);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(SCHEMAS.WalletTransaction);
};
