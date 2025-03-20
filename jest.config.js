const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // ✅ Ensures setup file is loaded
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"], // ✅ Helps Jest find modules
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // ✅ Support for absolute imports
  },
};

module.exports = createJestConfig(customJestConfig);
