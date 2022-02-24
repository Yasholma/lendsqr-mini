const { authController } = require("../controllers/auth.controller");
const { validationMiddleware } = require("../middlewares");
const {
  loginValidationRules,
  registerValidationRules,
} = require("../middlewares/auth_validation.middleware");

const router = require("express").Router();

router.post(
  "/register",
  registerValidationRules(),
  validationMiddleware,
  authController.register
);

router.post(
  "/login",
  loginValidationRules(),
  validationMiddleware,
  authController.login
);

exports.authRoutes = router;
