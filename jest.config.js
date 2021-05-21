const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest"
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: "react",
      }
    }
  },
  testRegex: "(src/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
