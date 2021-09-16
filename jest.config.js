const { defaults } = require('jest-config');

module.exports = {
  ...defaults, 
  setupFiles: ['./04-global-mocks/globalMocks.js'],
  testEnvironment: 'jsdom',
};
