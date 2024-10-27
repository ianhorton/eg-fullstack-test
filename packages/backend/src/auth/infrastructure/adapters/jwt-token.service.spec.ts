import * as jwt from 'jsonwebtoken';

import { User } from '../../domain/entities/user.entity';
import { JwtTokenServiceAdapter } from './jwt-token.service';
import { use } from 'passport';

describe('JwtTokenServiceAdapter', () => {
  let service: JwtTokenServiceAdapter;

  beforeEach(() => {
    service = new JwtTokenServiceAdapter();
  });

  // describe('generateToken', () => {
  //   it('should generate a JWT token with the correct payload and expiration', () => {
  //     const user: User = { email: 'test@example.com' } as User;
  //     const mockSign = jest.spyOn(jwt, 'sign').mockReturnValue('mocked-token');

  //     const token = service.generateToken(user);

  //     expect(mockSign).toHaveBeenCalledWith(
  //       { email: user.email },
  //       process.env.JWT_SECRET,
  //       { expiresIn: '1h' },
  //     );
  //     expect(token).toBe('mocked-token');

  //     mockSign.mockRestore();
  //   });
  // });

  describe('verifyToken', () => {
    it('should return true for a valid token', async () => {
      // arrange
      const tokenService = new JwtTokenServiceAdapter('1', 'secret');
      const user = new User(
        'foo@bar.com',
        'Jeff Bongo',
        '$2b$10$xeRTm64yF43yCtamurZVaucQUDPaDr.VaRLRY1EQ.rV8GqzwMYA1e',
        '671e22ac1ad45c3fc94f8da3',
      );

      const result = tokenService.generateToken(user);

      // act
      await new Promise((r) => setTimeout(r, 2000));
      const r = tokenService.verifyToken(result);

      // assert
      expect(r).toBeFalsy();

      // const mockVerify = jest.spyOn(jwt, 'verify').mockReturnValue(true);

      // const isValid = service.verifyToken('valid-token');

      // expect(mockVerify).toHaveBeenCalledWith(
      //   'valid-token',
      //   process.env.JWT_SECRET,
      // );
      // expect(isValid).toBe(true);

      // mockVerify.mockRestore();
    });

    // it('should throw an error for an invalid token', () => {
    //   const mockVerify = jest.spyOn(jwt, 'verify').mockImplementation(() => {
    //     throw new Error('Invalid token');
    //   });

    //   expect(() => service.verifyToken('invalid-token')).toThrow(
    //     'Invalid token',
    //   );

    //   mockVerify.mockRestore();
    // });
  });
});
