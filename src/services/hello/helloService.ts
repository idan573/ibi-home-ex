import { AxiosRequestConfig } from "axios";
import { HttpService } from "../http/httpService";

class HelloService {
    prefix = 'hello'
    httpClient = new HttpService({baseURL: 'http://localhost:5000/'});
    
    async get(config: AxiosRequestConfig = {}){
        return await this.httpClient.get(this.prefix, config);
    }
}

export const helloService = new HelloService(); //
