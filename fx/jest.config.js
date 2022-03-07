module.exports = {
  coverageProvider: "v8",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  collectCoverage: true,
  moduleFileExtensions: ["js", "mjs"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
};
