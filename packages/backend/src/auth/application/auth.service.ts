import * as bcrypt from 'bcrypt';

import { Inject, Injectable } from '@nestjs/common';

import { User } from '../domain/entities/user.entity';
import { TokenServicePort } from '../ports/token.service';
import { UserRepositoryPort } from '../ports/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
    @Inject('TokenServicePort') 
    private readonly tokenService: TokenServicePort,
  ) {}

  async signUp(email: string, password: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = User.createNew(email, passwordHash);
    await this.userRepository.create(newUser);
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = user.validatePassword(password, bcrypt.compareSync);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return this.tokenService.generateToken(user);
  }
}
