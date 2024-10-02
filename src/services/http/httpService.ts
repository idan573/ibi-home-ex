import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface IHttpService {
    client: AxiosInstance;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      body: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    put<T = any>(url: string, body: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export class HttpService implements IHttpService {
    client!: AxiosInstance;
  
    constructor({
      ...config
    }: AxiosRequestConfig = {}) {
      this.client = axios.create({
        timeout: 10000,
        ...config
      });
    }
    
    async get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
      return await this.client.get(url, config);
    }
  
    async post<T = any>(
      url: string,
      body: any,
      config: AxiosRequestConfig = {}
    ): Promise<T> {
      return await this.client.post(url, body, config);
    }
  
    async put<T = any>(
      url: string,
      body: any,
      config: AxiosRequestConfig = {}
    ): Promise<T> {
      return await this.client.put(url, body, config);
    }
  
    async delete<T = any>(
      url: string,
      config: AxiosRequestConfig = {}
    ): Promise<T> {
      return await this.client.delete(url, config);
    }
  }
  