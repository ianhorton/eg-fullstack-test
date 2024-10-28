import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpModel } from '../models/sign-up.model';
import { UserModel } from '../models/user.model';
import { SignInModel } from '../models/sign-in.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface AuthState {
  userId: string | undefined;
  user: UserModel | undefined;
  errors: string[];
  isSignUpInProgress: boolean;
  isSignInInProgress: boolean;
  token: string | undefined;
  tokenExpires: number | undefined;
}

const initialState: AuthState = {
  userId: undefined,
  user: undefined,
  errors: [],
  isSignUpInProgress: false,
  isSignInInProgress: false,
  token: undefined,
  tokenExpires: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthCommand: (): AuthState => {
      return initialState;
    },

    signUpCommand: (
      state: AuthState,
      _action: PayloadAction<SignUpModel>,
    ): AuthState => {
      return {
        ...state,
        isSignUpInProgress: true,
        errors: []
      };
    },

    signUpSucceededEvent: (
      state: AuthState,
      action: PayloadAction<UserModel>,
    ): AuthState => {
      const { payload } = action;
      return {
        ...state,
        user: payload,
        userId: payload.id,
        isSignUpInProgress: false,
      };
    },

    signUpFailedEvent: (
      state: AuthState,
      action: PayloadAction<string>,
    ): AuthState => {
      return {
        ...state,
        errors: [...state.errors, action.payload],
        isSignUpInProgress: false,
      };
    },

    signOutCommand: (state: AuthState): AuthState => {
      return initialState;
    },

    signInCommand: (
      state: AuthState,
      action: PayloadAction<SignInModel>,
    ): AuthState => {
      return {
        ...state,
        isSignInInProgress: true,
        errors: []
      };
    },

    signInSucceededEvent: (
      state: AuthState,
      action: PayloadAction<string>,
    ): AuthState => {
      const { payload } = action;
      return {
        ...state,
        isSignInInProgress: false,
        token: payload,
        tokenExpires: jwtDecode<JwtPayload>(payload).exp,
      };
    },

    signInFailedEvent: (
      state: AuthState,
      action: PayloadAction<string>,
    ): AuthState => {
      return {
        ...state,
        errors: [...state.errors, action.payload],
        isSignInInProgress: false,
      };
    },
  },
});

export const {
  resetAuthCommand,

  signUpCommand,
  signUpSucceededEvent,
  signUpFailedEvent,

  signInCommand,
  signInSucceededEvent,
  signInFailedEvent,

  signOutCommand,
} = authSlice.actions;

export default authSlice.reducer;
