import { ApiPort } from './api-port';

export class ApiAdapter implements ApiPort {
  hello(): Promise<Response> {
    return fetch('api/hello');
  }

  signUp(email: string, name: string, password: string): Promise<Response> {
  return  fetch("/auth/sign-up",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email, name, password})
        })
  }
}
