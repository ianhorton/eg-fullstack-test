import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiPort } from './api-port';
import api from './axios.config';

export class ApiAdapter implements ApiPort {
  welcome(token: string): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return api.get('api/welcome', config);
  }

  signUp(
    email: string,
    name: string,
    password: string,
  ): Promise<AxiosResponse> {
    return api.post('auth/sign-up', { email, name, password });
  }

  signIn(email: string, password: string): Promise<AxiosResponse> {
    return api.post('auth/sign-in', { email, password });
  }
}
