import { AxiosResponse } from 'axios';

export interface ApiPort {
  hello(): Promise<AxiosResponse>;

  signUp(email: string, name: string, password: string): Promise<AxiosResponse>;

  signIn(email: string, password: string): Promise<AxiosResponse>;
}
