import { User } from '../domain/entities/user.entity';

export interface TokenServicePort {
  generateToken(user: User): string;
  verifyToken(token: string): boolean;
}
