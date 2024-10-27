import { Inject, Injectable } from '@nestjs/common';

import { User } from '../domain/entities/user.entity';
import { TokenServicePort } from '../ports/token.service';
import { UserRepositoryPort } from '../ports/user.repository';
import { PasswordServicePort } from '../ports/password.service';
import { UserDto } from './dtos/user.dto';
import { ResultFactory, ResultWrapper } from '../../common/result.wrapper';

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
  ): Promise<ResultWrapper<UserDto> | ResultWrapper<void>> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      // return {
      //   isSuccess: false,
      //   isError: false,
      //   message: 'User already exists.',
      // };
      return ResultFactory.returnFailed('User already exists.');
    }

    const passwordHash = await this.passwordService.hashPassword(password);
    const newUser = User.createNew(email, name, passwordHash);

    try {
      const id = await this.userRepository.create(newUser);

      // return {
      //   isSuccess: true,
      //   payload: {
      //     id,
      //     name,
      //     email,
      //   },
      //};
      return ResultFactory.returnSuccess({
        id,
        name,
        email,
      });
    } catch (error) {
      // log error
      // return {
      //   isError: false,
      //   message: JSON.stringify(error),
      // };
      return ResultFactory.returnFailedError(JSON.stringify(error));
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<ResultWrapper<{ token: string }> | ResultWrapper<void>> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // return {
      //   isError: false,
      //   message: 'Invalid credentials.',
      // };
      return ResultFactory.returnFailed('User already exists.');
    }

    const isPasswordValid = user.validatePassword(
      password,
      this.passwordService.compareHash,
    );
    if (!isPasswordValid) {
      // return {
      //   isError: false,
      //   message: 'Invalid credentials.',
      // };
      return ResultFactory.returnFailed('User already exists.');
    }

    try {
      const token = this.tokenService.generateToken(user);

      // return {
      //   isError: true,
      //   payload: { token },
      // };
      return ResultFactory.returnSuccess({
        token,
      });
    } catch (error) {
      // return {
      //   isError: false,
      //   message: JSON.stringify(error),
      // };
      return ResultFactory.returnFailedError(JSON.stringify(error));
    }
  }
}
