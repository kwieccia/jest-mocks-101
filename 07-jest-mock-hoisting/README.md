It’s worth to know that `jest.mock()` is **hoisted**, which means it’s being moved to the top of the scope and initialized before any other regular code. The reason behind it is that **module must be mocked before it will be imported and used**.
Important consequence of such behavior is fact that it’s not possible to use any variable in the mock. 

In presented example I’m trying to import a constant value  and provide it as a function mock result, but unfortunatelly this will fail, because `jest.mock` is executed **before** the CONSTANT_VALUE import takes place, so it hasn’t got access to the constant. 

```
import { doSomething } from "./utils";

export class Class {
    static doSomeAction() {
        return doSomething();
    }
}
```
```
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
```

But there is a not hoisted alternative of `jest.mock`, named `jest.doMock`, that comes to the rescue. It is executed in a regular order and initialized exactly in the moment when it occurs in the code block. 

```
jest.doMock('./utils', () => ({
    doSomething: jest.fn(() => CONSTANT_VALUE),  
})); 
```

However, it’s not just that simple, because as I mentioned earlier, **mock of module must be initialized before import of unit that utilizes it** (`Class`), otherwise the mock won’t be working.  

First thing that comes to mind might be the idea of moving module import below the mock, but guess what? Import statements are hoisted too, which means it wouldn’t have any effect at all. 

```
import {CONSTANT_VALUE} from './constants';  

jest.doMock('./utils', () => ({
    doSomething: jest.fn(() => CONSTANT_VALUE),  
}));  

import {Class} from './Class'; // nope
```

So last thing that we need to do is replace import statement with its not hoisted version - `require`. Now it finally works as a charm. 

```
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
```