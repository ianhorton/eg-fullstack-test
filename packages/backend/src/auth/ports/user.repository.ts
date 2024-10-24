import { User } from '../domain/entities/user.entity';

export interface UserRepositoryPort {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
