import { AuthService } from './auth.service';
import { UserRepositoryPort } from '../ports/user.repository';
import { TokenServicePort } from '../ports/token.service';
import { User } from '../domain/entities/user.entity';
import { PasswordServicePort } from '../ports/password.service';
import { UserDto } from './dtos/user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: jest.Mocked<UserRepositoryPort>;
  let tokenServiceMock: jest.Mocked<TokenServicePort>;
  let passwordServiceMock: jest.Mocked<PasswordServicePort>;

  beforeEach(() => {
    // Mock the UserRepository
    userRepositoryMock = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      // You can add more methods as needed
    } as jest.Mocked<UserRepositoryPort>;

    // Mock the TokenService
    tokenServiceMock = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(),
    } as jest.Mocked<TokenServicePort>;

    passwordServiceMock = {
      hashPassword: jest.fn(),
      compareHash: jest.fn(),
    } as jest.Mocked<PasswordServicePort>;

    // Initialize AuthService with the mocked dependencies
    authService = new AuthService(
      passwordServiceMock,
      tokenServiceMock,
      userRepositoryMock,
    );
  });

  describe('signUp', () => {
    it('should return a failed result if the user already exists', async () => {
      // Arrange
      userRepositoryMock.findByEmail.mockResolvedValueOnce({} as User); // Mock existing user

      // Act
      const result = await authService.signUp(
        'test@test.com',
        'jeff bongo',
        'a1!09876',
      );

      // Assert
      expect(result).not.toBeNull();
      expect(result.isSuccess).toBeFalsy();
      expect(result.isError).toBeFalsy();

      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );
    });

    it('should hash the password and create a new user if the user does not exist', async () => {
      // Arrange
      userRepositoryMock.findByEmail.mockResolvedValueOnce(null); // No user found
      passwordServiceMock.hashPassword.mockResolvedValueOnce('hashedPassword');

      // Act
      const result = await authService.signUp(
        'test@test.com',
        'Jeff Bongo',
        'a1!09876',
      );
      console.log(result);

      // Assert
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );

      expect(userRepositoryMock.create).toHaveBeenCalledWith(
        expect.any(User), // This checks that a User object is passed to create
      );
      expect(result).not.toBeNull();
      expect(result.isSuccess).toBeTruthy();
      expect((result.payload as UserDto).email).toBe('test@test.com');
      expect((result.payload as UserDto).name).toBe('Jeff Bongo');
    });
  });

  describe('signIn', () => {
    it('should return failed result if the user is not found', async () => {
      // Arrange
      userRepositoryMock.findByEmail.mockResolvedValueOnce(null);

      // Act
      const result = await authService.signIn('test@test.com', 'password');

      // Assert
      expect(result).not.toBeNull();
      expect(result.isSuccess).toBeFalsy();
      expect(result.isError).toBeFalsy();
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );
    });

    it('should return failed if the password is invalid', async () => {
      // Arrange
      const user = {
        validatePassword: jest.fn().mockReturnValue(false), // Mock password validation failure
      } as unknown as User;

      userRepositoryMock.findByEmail.mockResolvedValueOnce(user);

      // Act
      const result = await authService.signIn('test@test.com', 'wrongpassword');

      // Assert
      expect(result).not.toBeNull();
      expect(result.isSuccess).toBeFalsy();
      expect(result.isError).toBeFalsy();
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );
      expect(user.validatePassword).toHaveBeenCalledWith(
        'wrongpassword',
        passwordServiceMock.compareHash,
      );
    });

    it('should return a token if the credentials are valid', async () => {
      // Arrange
      const user = {
        validatePassword: jest.fn().mockReturnValue(true), // Mock valid password
      } as unknown as User;

      userRepositoryMock.findByEmail.mockResolvedValueOnce(user);
      tokenServiceMock.generateToken.mockReturnValue('generatedToken'); // Mock token generation

      // Act
      const result = await authService.signIn('test@test.com', 'password');

      // Assert
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@test.com',
      );
      expect(user.validatePassword).toHaveBeenCalledWith(
        'password',
        passwordServiceMock.compareHash,
      );
      expect(tokenServiceMock.generateToken).toHaveBeenCalledWith(user);
      expect(result).not.toBeNull();
      expect(result.isSuccess).toBeTruthy();
      expect(result.payload as { token: string }).toStrictEqual({
        token: 'generatedToken',
      });
    });
  });
});
