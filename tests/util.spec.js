const { formatValidationErrors, generateRandom } = require("../utills");
const { mockedErrors } = require("./mock");

test("Validation error is returned in a correct format", async () => {
  expect(formatValidationErrors(mockedErrors)).toEqual([
    { email: "Email is required" },
    { password: "Password is required" },
  ]);
});

test("Generate random number to the specified length", async () => {
  expect(generateRandom(10).length).toEqual(10);
});
