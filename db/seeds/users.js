const { SCHEMAS } = require("../schema.constant");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(SCHEMAS.User).del();
  await knex(SCHEMAS.User).insert([
    { id: 1, name: "Hettie Marshall", email: "lantunde@acbo.va", role: "user" },
    { id: 2, name: "Hester Owens", email: "zo@girih.lv", role: "user" },
    { id: 3, name: "Henry Jackson", email: "bekamohi@owo.mt", role: "user" },
  ]);
};
