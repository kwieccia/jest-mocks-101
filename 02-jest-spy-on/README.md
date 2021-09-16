With the `jest.spyOn`, you can **replace an existing method of any class or imported module**, to a function mock. 

Let’s say we have `DataService` class with the public `getData` method. `getData` runs two external dependencies: `fetchData` (imported from `requests.ts`) and `storeData` (from `store.ts`). It uses private `parseData` method to modify the request response (capitalize letters) before passing it to the store. 

```
import { fetchData } from "./requests";
import { storeData } from "./store";

class DataService {
    getData(id: number) { 
        fetchData(id).then(res => {
            storeData(this.parseData(res.data));
        });
    }

    private parseData(data: string): string {
        return data.toUpperCase();
    }
}
```

To test `DataService` unit and `getData` method in isolation from external dependencies, and avoid calling original `fetchData` and `storeData` functions - only check if they are being called as expected, we can spy on them and provide fake implementation of these with `mockImplementation`. Then we are able to track their calls. 

```
test('original functions replaced', async () => {  
    const mockRequest = jest.spyOn(requests, 'fetchData')
        .mockImplementation(() => Promise.resolve({ data: 'foo' }));
    const mockStore = jest.spyOn(store, 'storeData')
        .mockImplementation(jest.fn());

    await DataServiceInstance.getData(99);
    
    expect(mockRequest).toBeCalledWith(99);
    expect(mockStore).toBeCalledWith('FOO');
});
```

Spies might be used to replace side effects, API calls, or to simulate some edge-case results like exceptions.

Please be aware that the original function is still called until we provide alternative implementation. So using `spyOn` not followed by `mockImplementation` will allow to detect calls and arguments, but it will run real functions (just extended with the tracking features). 

```
export function fetchData(id: number) { 
    // Fetch data from API. 
    return Promise.resolve({ data: 'potato' });
};
```
```
test('original functions called', async () => { 
    const spyRequest = jest.spyOn(requests, 'fetchData');
    const spyStore = jest.spyOn(store, 'storeData');

    await DataServiceInstance.getData(101);
    
    expect(spyRequest).toBeCalledWith(101);
    expect(spyStore).toBeCalledWith('POTATO');
});
```

One last thing to remember is **to restore spies after each test case**, otherwise mock once created, will still be connected to the real function, which could lead to unexpected results in the subsequent test cases. 

```
afterEach(() => { 
    jest.restoreAllMocks(); 
});
```