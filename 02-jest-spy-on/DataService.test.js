import * as requests from './requests';
import * as store from './store';
import DataServiceInstance from './DataService';

describe('jest.spyOn', () => {
    test('original functions replaced', async () => {  
        const mockRequest = jest.spyOn(requests, 'fetchData')
            .mockImplementation(() => Promise.resolve({ data: 'foo' }));
        const mockStore = jest.spyOn(store, 'storeData')
            .mockImplementation(jest.fn());
    
        await DataServiceInstance.getData(99);
        
        expect(mockRequest).toBeCalledWith(99);
        expect(mockStore).toBeCalledWith('FOO');
    });

    test('original functions called', async () => { 
        const spyRequest = jest.spyOn(requests, 'fetchData');
        const spyStore = jest.spyOn(store, 'storeData');
    
        await DataServiceInstance.getData(101);
        
        expect(spyRequest).toBeCalledWith(101);
        expect(spyStore).toBeCalledWith('POTATO');
    });

    // Commenting this part will lead test to fail
    afterEach(() => { 
        jest.restoreAllMocks(); 
    });
});