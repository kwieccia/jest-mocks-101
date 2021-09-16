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
  
