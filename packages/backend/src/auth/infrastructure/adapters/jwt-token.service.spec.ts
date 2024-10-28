import { User } from '../../domain/entities/user.entity';
import { JwtTokenServiceAdapter } from './jwt-token.service';

describe('JwtTokenServiceAdapter', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      // Arrange
      const tokenService = new JwtTokenServiceAdapter('1h', 'secret');
      const user = new User(
        'foo@bar.com',
        'Jeff Bongo',
        '$2b$10$xeRTm64yF43yCtamurZVaucQUDPaDr.VaRLRY1EQ.rV8GqzwMYA1e',
        '671e22ac1ad45c3fc94f8da3',
      );

      // Act
      const token = tokenService.generateToken(user);

      // Assert
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // Basic JWT format check
    });
  });

  describe('verifyToken', () => {

    it('should return true for a valid token', async () => {
      // Arrange
      const tokenService = new JwtTokenServiceAdapter('1h', 'secret');
      const user = new User(
        'foo@bar.com',
        'Jeff Bongo',
        '$2b$10$xeRTm64yF43yCtamurZVaucQUDPaDr.VaRLRY1EQ.rV8GqzwMYA1e',
        '671e22ac1ad45c3fc94f8da3',
      );

      const result = tokenService.generateToken(user);

      // Act
      const r = tokenService.verifyToken(result);

      // Assert
      expect(r).toBeTruthy();
    });

    it('should return false for a invalid token', async () => {
      // Arrange
      const tokenService = new JwtTokenServiceAdapter('1', 'secret');
      const user = new User(
        'foo@bar.com',
        'Jeff Bongo',
        '$2b$10$xeRTm64yF43yCtamurZVaucQUDPaDr.VaRLRY1EQ.rV8GqzwMYA1e',
        '671e22ac1ad45c3fc94f8da3',
      );

      const result = tokenService.generateToken(user);

      // Act
      await new Promise((_) => setTimeout(_, 2000));
      const r = tokenService.verifyToken(result);

      // Assert
      expect(r).toBeFalsy();
    });


  });
});
