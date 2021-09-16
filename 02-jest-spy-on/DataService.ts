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

const DataServiceInstance = new DataService();

export default DataServiceInstance;
  