# jest-mocks-101

```
npm install
npm run test
```

## (1) What is mock?

First question, **what exactly is a mock?** (Known also as a stub, or a test double.) 

In simple words, it is a **fake object, that simulates the data or behavior** of real object existing in the application, but in strictly controlled way.

## (2) Why do we need mocks?

Second question, **why do we need mocks** and what for? Well, mocks are mostly useful in **unit testing**.

In contrast to integration or end-to-end tests, the purpose of unit test is to verify **only one piece of code at a time**, to track low-level implementation issues. The test should be **deterministic**, **repeatable** and **focused only on functionalites of the particular unit**, and nothing else should influence the test results. 

A so-called unit can be a single utility, single class or a single component, but - that’s where the story gets complicated, because components in a front-end application might have many application-related and non-deterministic dependencies, like some external services, external sources of data and side effects. Since the purpose of unit test is verify only unit behavior - and not these dependencies behavior, instead of initialize any of them, we can replace them with predictable, explicitly provided mocks, **to fully control input and output of unit** while running a test.  
 
Also, some dependencies might be simply not available in the test environment, so there’s no other way than to mock them. 

## (3) Use cases

In JavaScript application you might need to mock:
 
- server data or API calls, 
- environment-related configuration, 
- global application state, 
- callbacks and side effects,
- browser APIs and window object methods,
- exceptions _(to test exception handling)_, 
- time _(not to delay the test execution with waiting for timeouts and intervals)_.  

## (4) Let’s move on to practice!

- [`jest.fn()`]()
- [`jest.spyOn()`]()
- [`jest.mock()`]()

Lifehacks:
01. [Global mocks]()
02. [Different function mocks for each test case ]()
03. [Restore original function for a single test case]()
02. [ Deal with jest.mock() hoisting]()
