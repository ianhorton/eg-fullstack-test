import { User } from '../domain/entities/user.entity';

export interface UserRepositoryPort {
  create(user: User): Promise<string>;
  findByEmail(email: string): Promise<User | null>;
}
