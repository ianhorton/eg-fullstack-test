import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response } from 'express';
import { AuthGuard } from './auth/auth.guard';
import { TokenServicePort } from './auth/ports/token.service';

describe('AppController', () => {
  let appController: AppController;
  let mockResponse: Partial<Response>;
  let tokenServiceMock: jest.Mocked<TokenServicePort>;

  beforeEach(async () => {
    const mockAuthGuard = {
      canActivate: jest.fn(() => true), // mock returning true to allow access
    };

    mockResponse = {
      status: jest.fn(),
    } as jest.Mocked<Partial<Response>>;

    // Mock the TokenService
    tokenServiceMock = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(),
    } as jest.Mocked<TokenServicePort>;

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthGuard,
        {
          provide: 'TokenServicePort',
          useExisting: tokenServiceMock,
        },
      ],
    })
      .overrideProvider(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideProvider('TokenServicePort')
      .useValue(tokenServiceMock)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Welcome to the application."', () => {
      // Act
      const result = appController.getWelcome(mockResponse as Response);
      // Assert
      expect(result).toEqual({
        httpStatus: 201,
        payload: 'Welcome to the application.',
        success: true,
      });
    });
  });
});
