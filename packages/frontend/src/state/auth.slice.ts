import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpModel } from '../models/sign-up.model';
import { UserModel } from '../models/user.model';

export interface AuthState {
  userId: string | undefined;
  user: UserModel | undefined;
  errors: string[];
  isSignUpInProgress: boolean;
  token: string | undefined;
}

const initialState: AuthState = {
  userId: undefined,
  user: undefined,
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

    signUpSucceededEvent: (
      state: AuthState,
      action: PayloadAction<UserModel>,
    ): AuthState => {
      const { payload} = action;
      return {
        ...state,
        user: payload,
        userId: payload.userId,
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
      return {
        ...state,
      };
    },
    // signOutSucceededEvent: (): AuthState => {
    //   return initialState;
    // },
    // signOutFailedEvent: (
    //   state: AuthState,
    //   action: PayloadAction<string>,
    // ): AuthState => {
    //   return {
    //     ...state,
    //     errors: [...state.errors, action.payload],
    //   };
    // },
  },
});

export const {
  resetAuthCommand,

  signUpCommand,
  signUpSucceededEvent,
  signUpFailedEvent,

  signOutCommand,
} = authSlice.actions;

export default authSlice.reducer;
