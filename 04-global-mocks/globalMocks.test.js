import { scrollToTop } from "./windowUtils";

describe('global mocked module', () => { 

    // When you remove windowUtils mock from globalMocks.js,
    // Jest will complain about window.scrollTo method:
    // "Not implemented: window.scrollTo".
    test('scrollToTop', () => {
        scrollToTop();
    });
}); 

describe('geolocation', () => {
    test('get default test coords', () => {
        navigator.geolocation.getCurrentPosition(pos => 
            expect(pos.coords).toEqual({
                latitude: 52,
                longitude: 21,
            })
        );
    });
});
