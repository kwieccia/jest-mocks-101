import Component from "./component";

jest.mock('./appHooks', () => ({
    ...jest.requireActual('./appHooks'), 
    hookApple: jest.fn(() => 'potato'),
}));
  
describe('extend module', () => {
    test('gimmie banana', () => {
        expect(Component.gimmieBanana()).toEqual('banana');
    });
    
    test('gimmie apple', () => {
        expect(Component.gimmieApple()).toEqual('potato');
    }); 
});
  
