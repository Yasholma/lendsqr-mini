const { userModel } = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers?.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(500).send({ message: "Auth Token is required" });
  }

  const userId = token?.split("_")[1];
  if (!userId) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const user = await userModel.findUserById(userId, { token: "token" }, true);
  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (user.token !== token) {
    return res.status(401).send({ message: "Invalid token provided" });
  }

  req.user = user;
  next();
};

exports.authMiddleware = authMiddleware;
