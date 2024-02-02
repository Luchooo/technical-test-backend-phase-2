/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/common/$1',
    "^@routes/(.*)": "<rootDir>/src/routes/$1",
    "^@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "^@config/(.*)": "<rootDir>/src/config/$1",
    "^@utils/(.*)": "<rootDir>/src/utils$1*"
  },
};