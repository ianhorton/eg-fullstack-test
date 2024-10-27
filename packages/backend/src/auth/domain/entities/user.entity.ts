export class User {
  constructor(
    public readonly email: string,
    public readonly name: string,
    private passwordHash: string, // Store the hashed password
  ) {}

  // Password requirements:
  //  • Minimum length of 8 characters
  //  • Contains at least 1 letter.
  //  • Contains at least 1 number.
  //  • Contains at least 1 special character.

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
