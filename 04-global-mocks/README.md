In order to have a **global mock, persistent across all test suites**, we need to place it in a separated file and declare this file’s path as a `setupFile` in Jest configuration (`jest.config.js`). Now the mock will be present in every single test file by default, without need to declare a mock over and over again. 

```
const { defaults } = require('jest-config');

module.exports = {
  ...defaults, 
  setupFiles: ['./04-global-mocks/globalMocks.js'],
  testEnvironment: 'jsdom',
};
```

Global setup file can be also used to mock **window object methods and browser APIs**, for example Geolocation. When you have a functionality that gets data about the user's current location, you can simulate returned coordinates for the test purpose. _(Please just remember about setting JSDOM as a test run environment to have access to the `window.navigator`)._

```
const mockGeolocation = {
    getCurrentPosition: jest.fn()
        .mockImplementation((success) => 
            Promise.resolve(success({
                coords: {
                    latitude: 52,
                    longitude: 21,
                }
            }))
        ),
};
window.navigator.geolocation = mockGeolocation;
```