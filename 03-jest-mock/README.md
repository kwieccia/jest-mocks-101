`jest.mock()` gives you ability to **overwrite whole existing module and provide its replacement**, whether it’s your custom module or Node module. 

In this example I mocked a custom module named `appHooks`. Dummy `Component` class that I’m testing uses these hooks internally, but now instead of original hooks definitions it calls provided function mocks during the test. As you can see, I will get `undefined` result (from empty function mocks) instead of original functions results. 

```
import * as hooks from "./appHooks";

export default class Component {
    static gimmieBanana() { 
        return hooks.hookBanana(); 
    }
    static gimmieApple() { 
        return hooks.hookApple(); 
    }
}
```
```
jest.mock('./appHooks', () => ({
    hookBanana: jest.fn(),
    hookApple: jest.fn(),
})); 
  
describe('mock module', () => {
    test('gimmie banana mock', () => {
        expect(Component.gimmieBanana()).toEqual(undefined);
    });
    
    test('gimmie apple mock', () => {
        expect(Component.gimmieApple()).toEqual(undefined);
    }); 
});
```

Actually, if you dont want to provide any custom replacement for the mocked module functions, it is enough to pass only the path to the module. Jest will automatically provide mocks for all its methods by itself.

```
jest.mock('./appHooks');
```

It is also possible to override only limited part of the module definition by requring actual module with `jest.requireActual` and extending it. Here I mocked only one of the functions, so original banana hook will be called during the test, but apple hook will be mocked as a ‘potato’. 

```
export const hookBanana = () => { return 'banana'; }
```
```
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
```

We can use `jest.mock` to simulate JSON configuration objects, external Node modules, or for example, React components (when you test them with Enzyme or react-testing-library, and you don’t want some child component to be rendered in a test of parent component).

```
jest.mock('./config', () => ({
    LANGUAGE: 'en_GB',
    SOME_FEATURE_ENABLED: false,
}));
```
```
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: { language: 'en' },
        tReady: true,
        t: str => str,
    })
}));
```
```
jest.mock('./components/SomeReactComponent', () => () => {
    return <></>;
})
```