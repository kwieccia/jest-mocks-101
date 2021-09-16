import {CONSTANT_VALUE} from './constants';   

jest.doMock('./utils', () => ({
    doSomething: jest.fn(() => CONSTANT_VALUE),  
}));  

const {Class} = require('./Class');

describe('mock with variables', () => {
    test('this will pass!', () => {
        expect(Class.doSomeAction()).toEqual(CONSTANT_VALUE); 
    });
}); 