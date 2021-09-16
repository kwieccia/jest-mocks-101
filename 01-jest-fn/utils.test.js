import { runCallback } from './utils';

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

    // Commenting this part will lead test to fail
    afterEach(() => {
        jest.clearAllMocks();
    });
});
