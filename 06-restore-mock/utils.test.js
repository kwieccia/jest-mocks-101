import { doSomething } from "./utils";
 
jest.mock('./utils');

describe('mock implementation per test case', () => {
    test('restore original util', () => {
        
        // Turn off the function mock
        doSomething.mockImplementation(
            jest.requireActual('./utils').doSomething
        );
        
        // Get original function call
        expect(doSomething()).toEqual(1000);

        // Restore the function mock
        doSomething.mockImplementation(jest.fn());
    });

    test('run mocked util again', () => {
        expect(doSomething()).toEqual(undefined);
    });
});