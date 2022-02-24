function generateRandom(length) {
  let dict = "ABCDEFGHJKLMNOPQRSTUVWXYZ".toLowerCase();

  let result = "";
  for (let i = length; i > 0; i -= 1) {
    result += dict[Math.round(Math.random() * (dict.length - 1))];
  }
  return result;
}

function formatValidationErrors(errors) {
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return extractedErrors;
}

module.exports = {
  generateRandom,
  formatValidationErrors,
};
