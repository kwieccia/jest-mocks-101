import Component from "./component";

jest.mock('./appHooks', () => ({
    hookBanana: jest.fn(),
    hookApple: jest.fn(),
}));

// Or just simply
// jest.mock('./appHooks');
  
describe('mock module', () => {
    test('gimmie banana mock', () => {
        expect(Component.gimmieBanana()).toEqual(undefined);
    });
    
    test('gimmie apple mock', () => {
        expect(Component.gimmieApple()).toEqual(undefined);
    }); 
});
