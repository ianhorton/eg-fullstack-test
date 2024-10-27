import { Inject, Injectable } from '@nestjs/common';

import { User } from '../domain/entities/user.entity';
import { TokenServicePort } from '../ports/token.service';
import { UserRepositoryPort } from '../ports/user.repository';
import { PasswordServicePort } from '../ports/password.service';
import { UserDto } from './dtos/user.dto';
import { ResultWrapper } from '../../common/result.wrapper';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PasswordServicePort')
    private readonly passwordService: PasswordServicePort,
    @Inject('TokenServicePort')
    private readonly tokenService: TokenServicePort,
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async signUp(
    email: string,
    name: string,
    password: string,
  ): Promise<ResultWrapper<UserDto>> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return {
        success: false,
        message: 'User already exists.',
      };
    }

    const passwordHash = await this.passwordService.hashPassword(password);
    const newUser = User.createNew(email, name, passwordHash);

    try {
      const id = await this.userRepository.create(newUser);

      return {
        success: true,
        payload: {
          id,
          name,
          email,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: JSON.stringify(error),
      };
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<ResultWrapper<{ token: string }>> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials.',
      };
    }

    const isPasswordValid = user.validatePassword(
      password,
      this.passwordService.compareHash,
    );
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid credentials.',
      };
    }

    try {
      const token = this.tokenService.generateToken(user);

      return {
        success: true,
        payload: { token },
      };
    } catch (error) {
      return {
        success: false,
        message: JSON.stringify(error),
      };
    }
  }
}
