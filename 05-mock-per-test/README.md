Here’s the clever way to provide **different function mock implementations for each test case**. 

I imported `appHooks` module in a test suite, and since they are already mocked above, and banana hook is not really banana hook anymore - it is replaced with a function mock, now I can use `mockImplementationOnce` to define one-time implementation, returning ‘potato’.  

In the next function run this implementation will not be valid anymore, so banana hook will return `undefined` value as a result of empty function mock. Of course in the next test case I can mock it again as something else, for example as an onion.

```
jest.mock('./appHooks', () => ({
    hookBanana: jest.fn(),
    hookApple: jest.fn(), 
}));

import * as hooks from "./appHooks"; 
  
describe('mock implementation per test', () => {
    test('mock banana as a potato', () => {
        hooks.hookBanana.mockImplementationOnce(() => 'potato');
        expect(hooks.hookBanana()).toEqual('potato'); 
    });
    
    test('return default banana mock', () => {
        expect(hooks.hookBanana()).toEqual(undefined); 
    });  
    
    test('mock banana as an onion', () => {
        hooks.hookBanana.mockImplementationOnce(() => 'onion');
        expect(hooks.hookBanana()).toEqual('onion'); 
    });  
}); 
```