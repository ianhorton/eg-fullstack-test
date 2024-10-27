import * as jwt from 'jsonwebtoken';

import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../domain/entities/user.entity';
import { TokenServicePort } from '../../ports/token.service';

@Injectable()
export class JwtTokenServiceAdapter implements TokenServicePort {
  constructor(
    @Inject('TOKEN_EXPIRES_IN') private readonly expiresIn: string,
    @Inject('TOKEN_EXPIRES_IN') private readonly secret?: string,
  ) {
    this.secret = secret ?? process.env.JWT_SECRET ?? 'secret';
  }

  generateToken(user: User): string {
    const payload = { username: user.email, sub: user.id };
    const result = jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
    return result;
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.secret);
      return true;
    } catch {
      return false;
    }
  }
}
