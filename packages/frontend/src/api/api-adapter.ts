import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiPort } from './api-port';


export class ApiAdapter implements ApiPort {
  welcome(token: string): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return axios.get('api/welcome', config);
  }

  signUp(
    email: string,
    name: string,
    password: string,
  ): Promise<AxiosResponse> {
    return axios.post('/auth/sign-up', { email, name, password });
  }

  signIn(email: string, password: string): Promise<AxiosResponse> {
    return axios.post('/auth/sign-in', { email, password });
  }
}
