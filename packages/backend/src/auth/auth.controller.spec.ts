import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';

import { Response } from 'express';

import { AuthService } from './application/auth.service';
import { ResultWrapper } from 'src/common/result.wrapper';
import { UserDto } from './application/dtos/user.dto';

// Mock AuthService entirely
jest.mock('./application/auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let mockResponse: Partial<Response>;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockResponse = {
      status: jest.fn(),
    } as jest.Mocked<Partial<Response>>;

    authServiceMock = {
      signUp: jest.fn(),
      signIn: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    const auth: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();

    authController = auth.get<AuthController>(AuthController);
  });

  describe('signUp', () => {
    it('should return success response and user object', async () => {
      // Arrange
      const payload: UserDto = {
        id: '123',
        name: 'Jeff Bongo',
        email: 'test@test.com',
      };
      const resultWrapper: ResultWrapper<UserDto> = {
        isSuccess: true,
        isError: false,
        payload,
      };
      authServiceMock.signUp.mockResolvedValueOnce(resultWrapper);

      // Act
      const result = await authController.signUp(mockResponse as Response, {
        email: 'test@test.com',
        name: 'Jeff Bongo',
        password: 'a1!09876',
      });

      // Assert
      expect(result).toEqual({
        httpStatus: 201,
        payload: {
          id: '123',
          name: 'Jeff Bongo',
          email: 'test@test.com',
        },
        success: true,
      });
    });

    it('should return failed response and return message if its not an error', async () => {
      // Arrange
      const resultWrapper: ResultWrapper<void> = {
        isSuccess: false,
        isError: false,
        message: 'returned in resposne',
      };
      authServiceMock.signUp.mockResolvedValueOnce(resultWrapper);

      // Act
      const result = await authController.signUp(mockResponse as Response, {
        email: 'test@test.com',
        name: 'Jeff Bongo',
        password: 'a1!09876',
      });

      // Assert
      expect(result).toEqual({
        httpStatus: 403,
        success: false,
        message: 'returned in resposne',
      });
    });

    it('should return failed response and standard message if its an error', async () => {
      // Arrange
      const resultWrapper: ResultWrapper<void> = {
        isSuccess: false,
        isError: true,
        message: 'returned in resposne',
      };
      authServiceMock.signUp.mockResolvedValueOnce(resultWrapper);

      // Act
      const result = await authController.signUp(mockResponse as Response, {
        email: 'test@test.com',
        name: 'Jeff Bongo',
        password: 'a1!09876',
      });

      // Assert
      expect(result).toEqual({
        httpStatus: 500,
        success: false,
        message: "Unexpected error occurred.",
      });
    });
  });
});
