const request = require("supertest");
const { knex } = require("../db");
const { SCHEMAS } = require("../db/schema.constant");
const { mockCreateUserOne, mockCreateUserTwo } = require("./mock");
const app = require("../");
const { userModel } = require("../models/user.model");

describe("user - and - auth", () => {
  let userOne = {
    id: null,
    record: null,
    token: "",
  };

  let userTwo = {
    id: null,
    record: null,
    token: "",
  };

  beforeAll(async () => {
    const [id] = await knex(SCHEMAS.User).insert(mockCreateUserOne);
    await knex(SCHEMAS.Wallet).insert({ userId: id });
    userOne.id = id;
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: mockCreateUserOne.email,
        password: mockCreateUserOne.password,
      })
      .expect(200);

    userOne.token = res.body.token;

    expect(res.body.hasOwnProperty("token")).toBe(true);
    expect(res.body.message).toStrictEqual("User logged in successfully");
  });

  it("should return all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", "Bearer " + userOne.token);

    expect(res.body.message).toStrictEqual(
      "All Users and account balance fetched"
    );

    expect(res.body.data.length).toEqual(1);
  });

  it("should find user by id", async () => {
    const res = await userModel.findUserById(userOne.id, {}, true);

    userOne.record = res;

    expect(res).toBeDefined();
    expect(res.name).toBe(mockCreateUserOne.name);
  });

  it("should fail to find user by id", async () => {
    await expect(
      userModel.findUserById(100)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should find user by email", async () => {
    const res = await userModel.findUserByEmail(userOne.record.email);
    expect(res).toBeDefined();
    expect(res.name).toBe(mockCreateUserOne.name);
  });

  it("should fail to find user by email", async () => {
    await expect(
      userModel.findUserByEmail("bola@gmail.com")
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should update user's name by id with new name", async () => {
    const oldName = userOne.record.name;
    const newName = "Senior";

    await userModel.updateUser(userOne.id, { name: newName });
    const updatedUser = await userModel.findUserById(userOne.id);

    expect(updatedUser.name).toBe(newName);
    expect(updatedUser.name).not.toBe(oldName);
  });

  it("should create a user", async () => {
    const res = await userModel.createUser(mockCreateUserTwo);

    userTwo.id = res.id;
    userTwo.record = res;

    expect(res).toBeDefined();
    expect(res.name).toBe(mockCreateUserTwo.name);
  });

  it("should fail to fund account if amount is 0 or negative", async () => {
    await expect(
      userModel.fundAccount(userOne.record, 0)
    ).rejects.toThrowErrorMatchingSnapshot();

    await expect(
      userModel.fundAccount(userOne.record, -100)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should fund account successfully", async () => {
    await userModel.fundAccount(userOne.record, 150);

    const user = await userModel.findUserById(userOne.id, {}, true);
    const newBalance = user.wallet.balance;
    userOne.record = user;

    expect(newBalance).toBe(150);
  });

  it("should fail to transfer fund <= 0", async () => {
    await expect(
      userModel.transferFund(userOne.record, userTwo.id, 0)
    ).rejects.toThrowErrorMatchingSnapshot();

    await expect(
      userModel.transferFund(userOne.record, userTwo.id, -100)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should fail to transfer fund higher than current balance", async () => {
    await expect(
      userModel.transferFund(userOne.record, userTwo.id, 5000)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should fail to transfer fund to an invalid recipient", async () => {
    const invalidUser = 1000;
    await expect(
      userModel.transferFund(userOne.record, invalidUser, 50)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should transfer fund to user two", async () => {
    const previousBalance = userOne.record.wallet.balance;
    await userModel.transferFund(userOne.record, userTwo.id, 50);

    const updatedUserOne = await userModel.findUserById(userOne.id, {}, true);
    userOne.record = updatedUserOne;

    const updatedUserTwo = await userModel.findUserById(userTwo.id, {}, true);
    userTwo.record = updatedUserTwo;

    expect(updatedUserTwo.wallet.balance).toBe(50);
    expect(updatedUserOne.wallet.balance).toBeLessThan(previousBalance);
  });

  it("should fail to withdraw if amount is <= 0", async () => {
    await expect(
      userModel.withdrawAmount(userOne.record, 0)
    ).rejects.toThrowErrorMatchingSnapshot();

    await expect(
      userModel.withdrawAmount(userOne.record, -100)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should fail to withdraw if amount is  > account balance", async () => {
    await expect(
      userModel.withdrawAmount(userOne.record, 1000)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should withdraw fund successfully", async () => {
    const previousBalance = userOne.record.wallet.balance;

    await userModel.withdrawAmount(userOne.record, 50);
    const updatedUserOne = await userModel.findUserById(userOne.id, {}, true);
    userOne.record = updatedUserOne;

    expect(updatedUserOne.wallet.balance).toBeLessThan(previousBalance);
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
