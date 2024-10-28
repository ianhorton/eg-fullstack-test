export class User {
  constructor(
    public readonly email: string,
    public readonly name: string,
    private passwordHash: string, // Store the hashed password
    public readonly id?: string,
  ) {}

  // this is obviously an anemic model, in a proper system this would be the place where 
  // all the business logic existed. It will remain entierly decoupled form any infrastructure.

  static createNew(email: string, name: string, passwordHash: string): User {
    return new User(email, name, passwordHash);
  }

  validatePassword(
    password: string,
    hashComparer: (password: string, hash: string) => Promise<boolean>,
  ): Promise<boolean> {
    return hashComparer(this.passwordHash, password);
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
