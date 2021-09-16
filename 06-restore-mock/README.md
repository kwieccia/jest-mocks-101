When you have a globally mocked module, but you need to restore original definition of some function for a particular test case, you can achieve that by combining `mockImplementation` with `jest.requireActual`, and after receiving the expected results the function should be mocked again, to still be a mock in the rest of the test cases.  

```
describe('mock implementation per test case', () => {
    test('restore original util', () => {
        
        // Turn off the function mock
        doSomething.mockImplementationOnce(
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
```