import { createReducer } from "@reduxjs/toolkit";
import {
  resetAuthCommand,
  // fetchIdentityIdCommand,
  // fetchIdentityIdFailedEvent,
  // fetchIdentityIdSucceededEvent,
  // handleSignInCodeCommand,
  // signInAndStoreSessionCommand,
  // signInCommand,
  // signInFailedEvent,
  // signInSucceededEvent,
  // signOutSucceededEvent,
   signUpCommand,
  // userDoesNotExistEvent,
} from "./AuthSlice";


export interface AccessTransientState {
  isSignInInProgress: boolean;
  userAlreadyExists: boolean;
  userDoesNotExist: boolean;
  isSignInFailed: boolean;
}

const initialState: AccessTransientState = {
  isSignInInProgress: false,
  userAlreadyExists: false,
  userDoesNotExist: false,
  isSignInFailed: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetAuthCommand, () => {
      return initialState;
    })
    .addCase(signUpCommand, (state, action) => {
      return {
        ...state,
        // username: action.payload.signUp.username,
        // usernameType: action.payload.usernameType
      };
    });
    // .addCase(signInAndStoreSessionCommand, (state, action) => {
    //   return {
    //     ...state,
    //     // if the user already exits then this
    //     // isn't a sign up...
    //     userAlreadyExists: !action.payload,
    //   };
    // })
    // .addCase(handleSignInCodeCommand, (state, action) => {
    //   return {
    //     ...state,
    //     isHandlingSignInCodeInProgress: true,
    //     code: action.payload,
    //   };
    // })
    // .addCase(signInCommand, (state, action) => {
    //   return {
    //     ...state,
    //     isSignInInProgress: true,
    //     userDoesNotExist: false,
    //     username: action.payload,
    //     isSignInFailed: false,
    //   };
    // })
    // .addCase(signInSucceededEvent, (state) => {
    //   return {
    //     ...state,
    //     isSignInInProgress: false,
    //   };
    // })
    // .addCase(userDoesNotExistEvent, (state) => {
    //   return {
    //     ...state,
    //     userDoesNotExist: true,
    //     isSignInInProgress: false,
    //   };
    // })
    // .addCase(signInFailedEvent, (state) => {
    //   return {
    //     ...state,
    //     isSignInInProgress: false,
    //     isHandlingSignInCodeInProgress: false,
    //     isSignInFailed: true
    //   };
    // })
    // .addCase(signOutSucceededEvent, () => {
    //   return initialState;
    // })
    // .addCase(fetchIdentityIdCommand, (state) => {
    //   return {
    //     ...state,
    //     isFetchingIdentityIdInProgress: true,
    //   };
    // })
    // .addCase(fetchIdentityIdSucceededEvent, (state) => {
    //   return {
    //     ...state,
    //     isFetchingIdentityIdInProgress: false,
    //   };
    // })
    // .addCase(fetchIdentityIdFailedEvent, (state) => {
    //   return {
    //     ...state,
    //     isFetchingIdentityIdInProgress: false,
    //   };
    // });
});

export default reducer;
