import { PayloadAction } from '@reduxjs/toolkit';
import { combineEpics, Epic } from 'redux-observable';
import { SignUpModel } from '../models/sign-up.model';
import { RootState } from './store';
import {
  signUpCommand,
  signUpFailedEvent,
  signUpSucceededEvent,
} from './auth.slice';
import { Observable, from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { EpicDependencies } from './epic-dependencies';
import { UserModel } from '../models/user.model';

const signUpCommandEpic$: Epic = (
  action$: Observable<PayloadAction<SignUpModel>>,
  rootState$: Observable<RootState>,
  { api: { signUp } }: EpicDependencies,
) => {
  return action$.pipe(
    filter((action) => signUpCommand.match(action)),

    mergeMap((action) => {
      const {
        payload: { email, name, password },
      } = action;
      return from(signUp(email, name, password)).pipe(
        map((response: Response) => {
          console.log(response);
          if (response.ok) {
            from(response.json()).pipe(
              map((data: UserModel) => {
                return of(signUpSucceededEvent(data));
              }),
            );
          } else {
            return of(signUpFailedEvent('Something went wrong!'));
          }
        }),
        catchError((error) => {
          return of(signUpFailedEvent(JSON.stringify(error)));
        }),
      );
    }),
  );
};

export default combineEpics(signUpCommandEpic$);
