import { AuthService } from './auth.service';
import { UserRepositoryPort } from '../ports/user.repository';
import { TokenServicePort } from '../ports/token.service';
import { User } from '../domain/entities/user.entity';
import { PasswordServicePort } from '../ports/password.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: jest.Mocked<UserRepositoryPort>;
  let tokenServiceMock: jest.Mocked<TokenServicePort>;
  let passwordServiceMock: jest.Mocked<PasswordServicePort>;

  // beforeEach(() => {
  //   // Mock the UserRepositoryPort
  //   userRepositoryMock = {
  //     findByEmail: jest.fn(),
  //     create: jest.fn(),
  //     // You can add more methods as needed
  //   } as jest.Mocked<UserRepositoryPort>;

  //   // Mock the TokenServicePort
  //   tokenServiceMock = {
  //     generateToken: jest.fn(),
  //   } as jest.Mocked<TokenServicePort>;

    // Initialize AuthService with the mocked dependencies
    authService = new AuthService(passwordServiceMock, tokenServiceMock, userRepositoryMock);
  });

  // describe('signUp', () => {
  //   it('should throw an error if the user already exists', async () => {
  //     userRepositoryMock.findByEmail.mockResolvedValueOnce({} as User); // Mock existing user

  //     await expect(authService.signUp('test@test.com', 'jeff bongo', 'password')).rejects.toThrow(
  //       'User already exists',
  //     );
  //     expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('test@test.com');
  //   });

  //   // it('should hash the password and create a new user if the user does not exist', async () => {
  //   //   userRepositoryMock.findByEmail.mockResolvedValueOnce(null); // No user found

  //   //   const bcryptHashSpy = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

  //   //   await authService.signUp('test@test.com', 'password');

  //   //   expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('test@test.com');
  //   //   expect(bcryptHashSpy).toHaveBeenCalledWith('password', 10);
  //   //   expect(userRepositoryMock.create).toHaveBeenCalledWith(
  //   //     expect.any(User), // This checks that a User object is passed to create
  //   //   );

  //   //   bcryptHashSpy.mockRestore(); // Restore the original bcrypt hash implementation
  //   // });
  // });

//   describe('signIn', () => {
//     it('should throw an error if the user is not found', async () => {
//       userRepositoryMock.findByEmail.mockResolvedValueOnce(null);

//       await expect(authService.signIn('test@test.com', 'password')).rejects.toThrow(
//         'Invalid credentials',
//       );
//       expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('test@test.com');
//     });

//     it('should throw an error if the password is invalid', async () => {
//       const user = {
//         validatePassword: jest.fn().mockReturnValue(false), // Mock password validation failure
//       } as unknown as User;

//       userRepositoryMock.findByEmail.mockResolvedValueOnce(user);

//       await expect(authService.signIn('test@test.com', 'wrongpassword')).rejects.toThrow(
//         'Invalid credentials',
//       );
//       expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('test@test.com');
//       expect(user.validatePassword).toHaveBeenCalledWith('wrongpassword', bcrypt.compareSync);
//     });

//     it('should return a token if the credentials are valid', async () => {
//       const user = {
//         validatePassword: jest.fn().mockReturnValue(true), // Mock valid password
//       } as unknown as User;

//       userRepositoryMock.findByEmail.mockResolvedValueOnce(user);
//       tokenServiceMock.generateToken.mockReturnValue('generatedToken'); // Mock token generation

//       const token = await authService.signIn('test@test.com', 'password');

//       expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('test@test.com');
//       expect(user.validatePassword).toHaveBeenCalledWith('password', bcrypt.compareSync);
//       expect(tokenServiceMock.generateToken).toHaveBeenCalledWith(user);
//       expect(token).toBe('generatedToken');
//     });
//   });
//});
