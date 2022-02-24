module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js"],
  roots: ["<rootDir>"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended"],
  globalSetup: "<rootDir>/tests/global-setup.js",
  globalTeardown: "<rootDir>/tests/global-teardown.js",
};
