const { validationResult } = require("express-validator");
const { formatValidationErrors } = require("../utills");

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    errors: formatValidationErrors(errors),
  });
};

module.exports = {
  validationMiddleware,
};
