import { AxiosResponse } from 'axios';

export interface ApiPort {
  welcome(token: string): Promise<AxiosResponse>;

  signUp(email: string, name: string, password: string): Promise<AxiosResponse>;

  signIn(email: string, password: string): Promise<AxiosResponse>;
}
