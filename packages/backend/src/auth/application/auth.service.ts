

import { Inject, Injectable } from '@nestjs/common';

import { User } from '../domain/entities/user.entity';
import { TokenServicePort } from '../ports/token.service';
import { UserRepositoryPort } from '../ports/user.repository';
import { PasswordServicePort } from '../ports/password.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PasswordServicePort')
    private readonly passwordService: PasswordServicePort,
    @Inject('TokenServicePort')
    private readonly tokenService: TokenServicePort,
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) { }

  async signUp(email: string, name: string, password: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await this.passwordService.hashPassword(password);
    const newUser = User.createNew(email, name, passwordHash);
    await this.userRepository.create(newUser);
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = user.validatePassword(password, this.passwordService.compareHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return this.tokenService.generateToken(user);
  }
}
