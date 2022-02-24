const { body } = require("express-validator");

const fundAccountValidationRules = () => {
  return [body("amount").notEmpty().withMessage("Amount is required")];
};

const transferFundValidationRules = () => {
  return [
    body("amount").notEmpty().isNumeric().withMessage("Amount is required"),
    body("recipient").notEmpty().withMessage("A valid recipient is required"),
  ];
};

const withdrawFundValidationRules = () => {
  return [
    body("amount").notEmpty().isNumeric().withMessage("Amount is required"),
  ];
};

module.exports = {
  fundAccountValidationRules,
  transferFundValidationRules,
  withdrawFundValidationRules,
};
