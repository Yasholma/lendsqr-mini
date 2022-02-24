const log = require("loglevel");
const { userModel } = require("../models/user.model");
const { generateRandom } = require("../utills");

class AuthController {
  async register(req, res) {
    try {
      await userModel.createUser(req.body);
      log.info("User created successfully");

      return res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      log.error(error?.message);
      return res
        .status(error?.status || 500)
        .send({ message: error?.message || "Something unexpected happened" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findUserByEmail(email);

      if (!user || user?.password !== password) {
        throw { status: 401, message: "Unauthorized" };
      }

      const token = `${generateRandom(10)}_${user.id}`;
      await userModel.updateUser(user.id, { token });

      return res
        .status(200)
        .send({ message: "User logged in successfully", token });
    } catch (error) {
      log.error(error?.message);
      return res
        .status(error?.status || 500)
        .send({ message: error?.message || "Something unexpected happened" });
    }
  }
}

exports.authController = new AuthController();
