import { Injectable } from "@nestjs/common";
import { PasswordServicePort } from "src/auth/ports/password.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordServiceAdapter implements PasswordServicePort {

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    compareHash(hash: string, password: string): Promise<boolean> {
        return bcrypt.compare(hash, password)
    }

}