
export interface PasswordServicePort {
    hashPassword(password: string): Promise<string>;
    compareHash(hash: string, password: string): Promise<boolean>;
}
