import { passwordValidator } from './password-validator';

describe('AuthService', () => {
  describe('passwordValidator', () => {
    it('returns true for valid passwords', () => {
      expect(passwordValidator('Valid123!')).toBe(true);
      expect(passwordValidator('Password1$')).toBe(true);
      expect(passwordValidator('Strong_P@ssw0rd')).toBe(true);
    });

    it('returns false for passwords less than 8 characters', () => {
      expect(passwordValidator('Short1!')).toBe(false);
      expect(passwordValidator('1234!')).toBe(false);
    });

    it('returns false for passwords without letters', () => {
      expect(passwordValidator('12345678!')).toBe(false);
      expect(passwordValidator('1234!@#$')).toBe(false);
    });

    it('returns false for passwords without numbers', () => {
      expect(passwordValidator('Password!')).toBe(false);
      expect(passwordValidator('Onlyletters!')).toBe(false);
    });

    it('returns false for passwords without special characters', () => {
      expect(passwordValidator('Password1')).toBe(false);
      expect(passwordValidator('1234abcd')).toBe(false);
    });

    it('returns false for empty password', () => {
      expect(passwordValidator('')).toBe(false);
    });

    it('returns false for passwords with only spaces', () => {
      expect(passwordValidator('        ')).toBe(false);
    });
  });
});
