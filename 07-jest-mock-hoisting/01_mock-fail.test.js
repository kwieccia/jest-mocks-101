import {Class} from './Class';
import {CONSTANT_VALUE} from './constants';  

jest.mock('./utils', () => ({
    doSomething: jest.fn(() => CONSTANT_VALUE),  
}));  

describe('mock with variables', () => {
    test('this will fail!', () => {
        expect(Class.doSomeAction()).toEqual(CONSTANT_VALUE); 
    });
}); 