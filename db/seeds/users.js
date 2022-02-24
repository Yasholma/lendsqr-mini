const { SCHEMAS } = require("../schema.constant");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(SCHEMAS.User).del();

  const users = await knex(SCHEMAS.User).insert([
    {
      id: 1,
      name: "Hettie Marshall",
      email: "lantunde@acbo.va",
      role: "user",
      password: "test123",
    },
    {
      id: 2,
      name: "Hester Owens",
      email: "zo@girih.lv",
      role: "user",
      password: "test123",
    },
    {
      id: 3,
      name: "Henry Jackson",
      email: "bekamohi@owo.mt",
      role: "user",
      password: "test123",
    },
  ]);

  await Promise.all(
    users.map(async (user) => {
      await knex(SCHEMAS.Wallet).insert({ userId: user });
    })
  );
};
