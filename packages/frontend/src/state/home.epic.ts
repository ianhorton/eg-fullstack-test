import { AxiosError, AxiosResponse } from 'axios';
import { combineEpics, Epic } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';

import { Action, PayloadAction } from '@reduxjs/toolkit';

import { ResponseWrapper } from '../common/response-wrapper';
import { EpicDependencies } from './epic-dependencies';
import {
  fetchMessageCommand,
  fetchMessageFailedEvent,
  fetchMessageSucceededEvent,
  resetHomeCommand,
  resetHomeSucceededEvent,
} from './home.slice';
import { RootState } from './store';

export const resetHomeCommandEpic$: Epic = (action$: Observable<Action>) => {
  return action$.pipe(
    filter((action) => resetHomeCommand.match(action)),
    map(() => {
      return resetHomeSucceededEvent();
    }),
  );
};

export const fetchMessageCommandEpic$: Epic = (
  action$: Observable<Action>,
  rootState$: Observable<RootState>,
  { api: { welcome } }: EpicDependencies,
) => {
  return action$.pipe(
    filter((action) => fetchMessageCommand.match(action)),

    withLatestFrom(rootState$),

    map(([, state]) => {
      const {
        authState: { token, tokenExpires },
      } = state;

      return { token, tokenExpires };
    }),

    mergeMap(({ token, tokenExpires }) => {
      return from(welcome(token)).pipe(
        map((response: AxiosResponse) => {
          const res = response.data as ResponseWrapper<string>;
          console.log('res: ', res);
          return fetchMessageSucceededEvent(res.payload ?? '');
        }),
        catchError((error: AxiosError) => {
          if (error.response.data) {
            const res = error.response.data as ResponseWrapper;
            return of(fetchMessageFailedEvent(res.message));
          }
          return of(fetchMessageFailedEvent(JSON.stringify(error)));
        }),
      );
    }),
  );
};

export default combineEpics(fetchMessageCommandEpic$);
