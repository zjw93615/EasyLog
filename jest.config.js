/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$"
};