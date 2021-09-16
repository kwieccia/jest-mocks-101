// This file is provided as a setupFile in jest.config.js.

jest.mock('./windowUtils', () => ({
    openWindow: jest.fn(),
    scrollToTop: jest.fn(),
})); 

const mockGeolocation = {
    getCurrentPosition: jest.fn()
        .mockImplementation((success) => 
            Promise.resolve(success({
                coords: {
                    latitude: 52,
                    longitude: 21,
                }
            }))
        ),
};
window.navigator.geolocation = mockGeolocation;
 