import { Inject, Injectable, Logger } from '@nestjs/common';

import { User } from '../domain/entities/user.entity';
import { TokenServicePort } from '../ports/token.service';
import { UserRepositoryPort } from '../ports/user.repository';
import { PasswordServicePort } from '../ports/password.service';
import { UserDto } from './dtos/user.dto';
import { ResultFactory, ResultWrapper } from '../../common/result.wrapper';
import { passwordValidator } from './password-validator';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
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
    this.logger.debug('signUp called with: ', { email, name, password });

    // Validating an email in code is hard so this system would not try.
    // The sign up process should instead send an email to the address
    // passed in for validation. Beyond the scope of this exerice but
    // it would be a valid mechanism for 2FA as well.

    const passwordIsValid = passwordValidator(password);
    if (passwordIsValid === false) {
      this.logger.warn('password valdiation failed: ', { password });
      return ResultFactory.returnFailed(
        'The password must be at least 8 characters and contain at least a letter, a number and special character.',
      );
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      this.logger.warn('user already exists for email: ', { email });
      return ResultFactory.returnFailed(
        'A User with this Email already exists.',
      );
    }
    try {
      const passwordHash = await this.passwordService.hashPassword(password);
      const newUser = User.createNew(email, name, passwordHash);

      const id = await this.userRepository.create(newUser);
      this.logger.debug('new user created for: ', { email });
      return ResultFactory.returnSuccess({
        id,
        name,
        email,
      });
    } catch (error) {
      this.logger.error(error);
      return ResultFactory.returnFailedError(JSON.stringify(error));
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<ResultWrapper<{ token: string }> | ResultWrapper<void>> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.warn('user not found for email: ', { email });
      return ResultFactory.returnFailed('Invalid credentials.');
    }

    const isPasswordValid = user.validatePassword(
      password,
      this.passwordService.compareHash,
    );

    if (!isPasswordValid) {
      this.logger.warn('invalid password for email: ', { email });
      return ResultFactory.returnFailed('Invalid credentials.');
    }

    try {
      const token = this.tokenService.generateToken(user);
      this.logger.debug('token generated for email: ', { email });
      return ResultFactory.returnSuccess({
        token,
      });
    } catch (error) {
      this.logger.error(error);
      return ResultFactory.returnFailedError(JSON.stringify(error));
    }
  }
}
