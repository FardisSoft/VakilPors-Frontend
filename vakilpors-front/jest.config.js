
module.exports = {
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: [
    "<rootDir>/src/**/**/*.test.jsx",
    "<rootDir>/src/**/**/*.test.js",
  ],
  moduleNameMapper:{
    "axios":"axios/dist/node/axios.cjs",
    "^.+\\.(css|scss|jpg|jpeg|png)$": "<rootDir>/config/CSSStub.js"
  },
  // transformIgnorePatterns:["node_modules/(?!axios)"],
  testEnvironment: "jest-environment-jsdom",
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"]
};
