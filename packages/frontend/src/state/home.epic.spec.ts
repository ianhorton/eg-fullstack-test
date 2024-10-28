import { StateObservable } from 'redux-observable';
import { of, Subject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { ApiPort } from '../api/api-port';
import { ResponseWrapper } from '../common/response-wrapper';
import { EpicDependencies } from './epic-dependencies';
import { fetchMessageCommandEpic$, resetHomeCommandEpic$ } from './home.epic';
import {
  fetchMessageCommand,
  fetchMessageFailedEvent,
  fetchMessageSucceededEvent,
  resetHomeCommand,
  resetHomeSucceededEvent,
} from './home.slice';
import { RootState } from './store';

export class AxError extends Error {
  constructor(public response: { data: {} | undefined }) {
    super('');
  }
}

describe('fetchMessageCommandEpic$', () => {
  let testScheduler: TestScheduler;
  let dependencies: EpicDependencies;
  let apiMock: jest.Mocked<ApiPort>;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      console.log('actual: ', actual);
      console.log('expected: ', expected);
      expect(actual).toEqual(expected);
    });

    apiMock = {
      welcome: jest.fn(),
      signUp: jest.fn(),
      signIn: jest.fn(),
    } as jest.Mocked<ApiPort>;

    dependencies = {
      api: apiMock,
    };
  });

  it('should dispatch resetHomeSucceededEvent', () => {
    // Arrange
    const stateSubject = new Subject<RootState>();
    const state$ = new StateObservable(stateSubject, {
      authState: { token: '123' },
    });

    // Act
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', { a: resetHomeCommand() });
      const output$ = resetHomeCommandEpic$(action$, state$, null);

      // Assert
      expectObservable(output$).toBe('-b', {
        b: resetHomeSucceededEvent(),
      });
    });
  });

  it('should dispatch fetchMessageSucceededEvent on successful fetch', () => {
    // Arrange
    const mockResponse: ResponseWrapper<string> = {
      success: true,
      payload: 'foo',
    };

    (dependencies.api.welcome as jest.Mock).mockReturnValue(
      of({ data: mockResponse }),
    );

    const stateSubject = new Subject<RootState>();
    const state$ = new StateObservable(stateSubject, {
      authState: { token: '123' },
    });

    // Act
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', { a: fetchMessageCommand() });
      const output$ = fetchMessageCommandEpic$(action$, state$, dependencies);

      // Assert
      expectObservable(output$).toBe('-b', {
        b: fetchMessageSucceededEvent('foo'),
      });
    });
  });

  it('should dispatch fetchMessageFailedEvent on unsuccessful fetch', () => {
    // Arrange
    (dependencies.api.welcome as jest.Mock).mockReturnValue(
      testScheduler.createColdObservable(
        '--#',
        {},
        new AxError({ data: undefined }),
      ),
    );

    const stateSubject = new Subject<RootState>();
    const state$ = new StateObservable(stateSubject, {
      authState: { token: '123' },
    });

    // Act
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', { a: fetchMessageCommand() });
      const output$ = fetchMessageCommandEpic$(action$, state$, dependencies);

      // Assert
      expectObservable(output$).toBe('---------------------b', {
        b: fetchMessageFailedEvent('{"response":{}}'),
      });
    });
  });
});
