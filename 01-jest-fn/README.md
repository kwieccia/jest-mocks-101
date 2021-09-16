`jest.fn()` simply creates a **function mock**. 

Imagine that we want to test a util that takes two arguments: a number and a callback function. It multiplies number by five, and if result is less than a hundred, it runs callback with that multiplied number.

```
export function runCallback(aNumber, callback) { 
   
    const xNumber = aNumber * 5;

    if (xNumber < 100) {
        callback(xNumber);
    }
}
```

If we provide function mock as a callback function, then by the function mock reference, you are able to **detect its calls** and **check what arguments it’s been called with**. 

```
describe('run callback', () => {
    const callbackMock = jest.fn();

    test('should run callback (19 * 5 < 100)', () => {
        runCallback(19, callbackMock);
        
        expect(callbackMock).toBeCalled();
        expect(callbackMock).toBeCalledTimes(1);
        expect(callbackMock).toBeCalledWith(95);
    });

    test('should not run callback (20 * 5 == 100)', () => {
        runCallback(20, callbackMock);
 
        expect(callbackMock).not.toBeCalled(); 
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
```

And that’s the superpower of function mocks: they are not just dummy placeholders, they let us verify how function was used by the tested unit. They can also return any specified value.

Please remember that function mocks should be cleared between tests (`clearAllMocks`) if they are defined in higher scope and reused in multiple test cases  - they would keep the entire call history otherwise, and receiveing the calls from the first test case in a second test case is definitely something that we don’t want to happen.