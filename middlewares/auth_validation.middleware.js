const { body } = require("express-validator");

const registerValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password min length is 5"),
  ];
};

const loginValidationRules = () => {
  return [
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
