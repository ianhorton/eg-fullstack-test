import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpModel } from './SignUpModel';

export interface AuthState {
  userId: string | undefined;
  errors: string[];
  isSignUpInProgress: boolean;
  token: string | undefined;
}

const initialState: AuthState = {
  userId: undefined,
  errors: [],
  isSignUpInProgress: false,
  token: undefined,
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

    signUpSucceededEvent: (
      state: AuthState,
      action: PayloadAction<string>,
    ): AuthState => {
      return {
        ...state,
        errors: [...state.errors, action.payload],
        isSignUpInProgress: false,
      };
    },
  },
});

export const {
  resetAuthCommand,

  signUpCommand,
} = authSlice.actions;

export default authSlice.reducer;
