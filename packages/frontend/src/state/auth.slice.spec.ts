import authReducer, {
  AuthState,
  initialState,
  resetAuthCommand,
  signUpCommand,
  signUpSucceededEvent,
  signUpFailedEvent,
  signInCommand,
  signInSucceededEvent,
  signInFailedEvent,
  signOutCommand,
} from './auth.slice';
import { SignUpModel } from '../models/sign-up.model';
import { UserModel } from '../models/user.model';
import { JwtPayload } from 'jwt-decode';

describe('authSlice reducer', () => {

  it('should handle resetAuthCommand', () => {
    // Arrange
    const stateWithChange: AuthState = {
      ...initialState,
      userId: '123',
    };
    const action = resetAuthCommand();

    // Act
    const nextState = authReducer(stateWithChange, action);

    // Assert
    expect(nextState).toEqual({
      userId: undefined,
      user: undefined,
      errors: [],
      isSignUpInProgress: false,
      isSignInInProgress: false,
      token: undefined,
      tokenExpires: undefined,
    });
  });

  it('should handle signUpCommand', () => {
    // Arrange
    const stateWithErrors: AuthState = {
      ...initialState,
      errors: ['Some error'],
    };
    const action = signUpCommand({
      email: 'jb@foo.com',
      name: 'Jeff Bongo',
      password: '123',
    } as SignUpModel);

    // Act
    const nextState = authReducer(stateWithErrors, action);

    // Assert
    expect(nextState.isSignUpInProgress).toEqual(true);
    expect(nextState.errors).toEqual([]);
  });

  it('should handle signUpSucceededEvent', () => {
    // Arrange
    const user: UserModel = {
      id: '123',
      name: 'Jeff Bongo',
      email: "foo@bar.com"
    };
    const action = signUpSucceededEvent(user);

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.userId).toEqual('123');
    expect(nextState.user).toEqual(user);
    expect(nextState.isSignUpInProgress).toEqual(false);
  });

  it('should handle signUpFailedEvent', () => {
    // Arrange
    const errorMessage = 'Sign-up failed';
    const action = signUpFailedEvent(errorMessage);

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.errors).toContain(errorMessage);
    expect(nextState.isSignUpInProgress).toEqual(false);
  });

  it('should handle signInCommand', () => {
    // Arrange
    const action = signInCommand({
      email: 'jb@foo.com',
      password: '123',
    });

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.isSignInInProgress).toEqual(true);
    expect(nextState.errors).toEqual([]);
  });

  xit('should handle signInSucceededEvent', () => {
    // Arrange
    const token = 'test.jwt.token';
    const mockDecodedToken: JwtPayload = { exp: 123456789 };
    jest.mock('jwt-decode', () => ({
      jwtDecode: () => mockDecodedToken,
    }));
    const action = signInSucceededEvent(token);

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.token).toEqual(token);
    expect(nextState.tokenExpires).toEqual(123456789);
    expect(nextState.isSignInInProgress).toEqual(false);

    // Cleanup
    jest.restoreAllMocks();
  });

  it('should handle signInFailedEvent', () => {
    // Arrange
    const errorMessage = 'Invalid credentials';
    const action = signInFailedEvent(errorMessage);

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.errors).toContain(errorMessage);
    expect(nextState.isSignInInProgress).toEqual(false);
  });

  it('should handle signOutCommand', () => {
    // Arrange
    const stateWithAuth: AuthState = {
      ...initialState,
      userId: '123',
      user: { id: '123', name: 'John Doe', email: "foo@bar.com" },
      token: 'some.token',
    };
    const action = signOutCommand();

    // Act
    const nextState = authReducer(stateWithAuth, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

});
