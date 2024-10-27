import axios, { AxiosResponse } from 'axios';
import { ApiPort } from './api-port';

export class ApiAdapter implements ApiPort {
  hello(): Promise<AxiosResponse> {
    return axios.get('api/hello');
  }

  async signUp(
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
