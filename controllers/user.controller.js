const log = require("loglevel");
const { userModel } = require("../models/user.model");

class UserController {
  async getAllUsers(req, res) {
    try {
      const data = await userModel.getUsers();

      return res
        .status(200)
        .send({ message: "All Users and account balance fetched", data });
    } catch (error) {
      log.error(error?.message);
      return res
        .status(error?.status || 500)
        .send({ message: error?.message || "Something unexpected happened" });
    }
  }

  async fundAccount(req, res) {
    try {
      const { amount } = req.body;
      const userId = req.user.id;

      await userModel.fundAccount(req.user, +amount);
      const user = await userModel.findUserById(userId, {}, true);

      return res
        .status(200)
        .send({ message: "Account successfully funded", data: user });
    } catch (error) {
      log.error(error?.message);
      return res
        .status(error?.status || 500)
        .send({ message: error?.message || "Something unexpected happened" });
    }
  }

  async transferFund(req, res) {
    try {
      const { amount, recipient } = req.body;

      const recipientRecord = await userModel.transferFund(
        req.user,
        recipient,
        +amount
      );

      const user = await userModel.findUserById(req.user.id, {}, true);

      return res.status(200).send({
        message: `Amount of ${+amount} has been successfully transfered to ${
          recipientRecord.name
        }`,
        data: user,
      });
    } catch (error) {
      log.error(error?.message);
      return res
        .status(error?.status || 500)
        .send({ message: error?.message || "Something unexpected happened" });
    }
  }

  async withdrawFund(req, res) {
    try {
      const { amount } = req.body;
      const userId = req.user.id;

      await userModel.withdrawAmount(req.user, +amount);
      const user = await userModel.findUserById(userId, {}, true);

      return res.status(200).send({
        message: `Amount of ${+amount} has successfully been withdrawn from your account`,
        data: user,
      });
    } catch (error) {
      log.error(error?.message);
      return res
        .status(error?.status || 500)
        .send({ message: error?.message || "Something unexpected happened" });
    }
  }

  async me(req, res) {
    try {
      return res.status(200).send({
        message: `Profile details fetched`,
        data: req.user,
      });
    } catch (error) {
      log.error(error?.message);
      return res
        .status(error?.status || 500)
        .send({ message: error?.message || "Something unexpected happened" });
    }
  }

  async logout(req, res) {
    try {
      const user = req.user;
      await userModel.updateUser(user.id, { token: null });
      return res.status(200).send({ message: "User successfully logged out" });
    } catch (error) {
      log.error(error?.message);
      return res
        .status(error?.status || 500)
        .send({ message: error?.message || "Something unexpected happened" });
    }
  }
}

exports.userController = new UserController();
