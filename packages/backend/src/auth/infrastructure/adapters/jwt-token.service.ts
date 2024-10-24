import * as jwt from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';

import { User } from '../../domain/entities/user.entity';
import { TokenServicePort } from '../../ports/token.service';

@Injectable()
export class JwtTokenServiceAdapter implements TokenServicePort {
  generateToken(user: User): string {
    const payload = { email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}
