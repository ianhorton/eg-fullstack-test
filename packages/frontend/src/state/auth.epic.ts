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
  signUpCommand,
  signUpFailedEvent,
  signUpSucceededEvent,
} from './auth.slice';
import { EpicDependencies } from './epic-dependencies';
import { RootState } from './store';
import { ResponseWrapper } from '../common/response-wrapper';
import { AxiosError, AxiosResponse } from 'axios';

const signUpCommandEpic$: Epic = (
  action$: Observable<PayloadAction<SignUpModel>>,
  rootState$: Observable<RootState>,
  { api: { signUp, hello } }: EpicDependencies,
) => {
  return action$.pipe(
    filter((action) => signUpCommand.match(action)),

    mergeMap((action) => {
      const {
        payload: { email, name, password },
      } = action;
      return from(signUp(email, name, password)).pipe(
        map((response: AxiosResponse) => {
          const res = response.data as ResponseWrapper<UserModel>
          return signUpSucceededEvent(res.payload);
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

export default combineEpics(signUpCommandEpic$);
