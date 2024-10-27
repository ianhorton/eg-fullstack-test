export interface ApiPort {
  hello(): Promise<Response>;

  signUp(email: string, name: string, password: string): Promise<Response>;
}
