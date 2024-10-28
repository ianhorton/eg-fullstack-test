import { combineEpics, Epic } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';

import { PayloadAction } from '@reduxjs/toolkit';

import { SignUpModel } from '../models/sign-up.model';
import { UserModel } from '../models/user.model';
import {
  signInCommand,
  signInFailedEvent,
  signInSucceededEvent,
  signUpCommand,
  signUpFailedEvent,
  signUpSucceededEvent,
} from './auth.slice';
import { EpicDependencies } from './epic-dependencies';
import { RootState } from './store';
import { ResponseWrapper } from '../common/response-wrapper';
import { AxiosError, AxiosResponse } from 'axios';
import { TokenModel } from '../models/token.model';

export const signUpCommandEpic$: Epic = (
  action$: Observable<PayloadAction<SignUpModel>>,
  state$: Observable<RootState>,
  { api: { signUp } }: EpicDependencies,
) => {
  return action$.pipe(
    filter((action) => signUpCommand.match(action)),

    mergeMap((action) => {
      const {
        payload: { email, name, password },
      } = action;
      return from(signUp(email, name, password)).pipe(
        map((response: AxiosResponse) => {
          const res = response.data as ResponseWrapper<UserModel>;
          const p = res.payload;
          return signUpSucceededEvent(p);
        }),
        catchError((error: AxiosError) => {
          if (error.response.data) {
            const res = error.response.data as ResponseWrapper;
            return of(signUpFailedEvent(res.message));
          }
          return of(signUpFailedEvent(JSON.stringify(error)));
        }),
      );
    }),
  );
};

const signInCommandEpic$: Epic = (
  action$: Observable<PayloadAction<SignUpModel>>,
  rootState$: Observable<RootState>,
  { api: { signIn } }: EpicDependencies,
) => {
  return action$.pipe(
    filter((action) => signInCommand.match(action)),

    mergeMap((action) => {
      const {
        payload: { email, password },
      } = action;
      return from(signIn(email, password)).pipe(
        map((response: AxiosResponse) => {
          const res = response.data as ResponseWrapper<TokenModel>;
          return signInSucceededEvent(res.payload.token);
        }),
        catchError((error: AxiosError) => {
          if (error.response.data) {
            const res = error.response.data as ResponseWrapper;
            return of(signInFailedEvent(res.message));
          }
          return of(signInFailedEvent(JSON.stringify(error)));
        }),
      );
    }),
  );
};

export default combineEpics(signUpCommandEpic$, signInCommandEpic$);
