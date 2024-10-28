import { StateObservable } from 'redux-observable';
import { of, Subject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { ApiPort } from '../api/api-port';
import { ResponseWrapper } from '../common/response-wrapper';
import { SignUpModel } from '../models/sign-up.model';
import { UserModel } from '../models/user.model';
import { signUpCommandEpic$ } from './auth.epic';
import { initialState, signUpCommand, signUpFailedEvent, signUpSucceededEvent } from './auth.slice';
import { EpicDependencies } from './epic-dependencies';
import { RootState } from './store';

xdescribe('signUpCommandEpic$', () => {
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

  it('should dispatch signUpSucceededEvent on successful signup', () => {
    // Arrange
    const name = 'Jeff Bongo';
    const email = 'jb@foo.com';

    const signUpModel: SignUpModel = {
      email,
      name,
      password: 'password123',
    };

    const payload: UserModel = { email, id: '123', name };
    const mockResponse: ResponseWrapper<UserModel> = {
      success: true,
      payload,
    };

    (dependencies.api.signUp as jest.Mock).mockReturnValue(
      of({ data: mockResponse }),
    );

    const stateSubject = new Subject<RootState>();
    const state$ = new StateObservable(stateSubject, {});

    // Act
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', { a: signUpCommand(signUpModel) });
      const output$ = signUpCommandEpic$(action$, state$, dependencies);

      // Assert
      expectObservable(output$).toBe('-b', {
        b: signUpSucceededEvent(payload),
      });
    });
  });

  it('should dispatch signUpFailedEvent on unsuccessful signup', () => {
    // Arrange
    const name = 'Jeff Bongo';
    const email = 'jb@foo.com';

    const signUpModel: SignUpModel = {
      email,
      name,
      password: 'password123',
    };

    const payload: UserModel = { email, id: '123', name };
    const mockResponse: ResponseWrapper<UserModel> = {
      success: true,
      payload,
    };

    (dependencies.api.signUp as jest.Mock).mockReturnValue(
      of(new Error('It failed!!')),
    );

    const stateSubject = new Subject<RootState>();
    const state$ = new StateObservable(stateSubject, {});

    // Act
    testScheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', { a: signUpCommand(signUpModel) });
      const output$ = signUpCommandEpic$(action$, state$, dependencies);

      // Assert
      expectObservable(output$).toBe('-b', {
        b: signUpFailedEvent(''),
      });
    });
  });

  // it('should dispatch signUpFailedEvent on failed signup', () => {
  //   const mockPayload: SignUpModel = {
  //     email: 'test@example.com',
  //     name: 'Test User',
  //     password: 'password123',
  //   };
  //   const mockErrorResponse = {
  //     response: { data: { message: 'Error occurred' } },
  //   };

  //   dependencies.api.signUp.mockReturnValue(cold('#', {}, mockErrorResponse));

  //   testScheduler.run(({ hot, expectObservable }) => {
  //     const action$ = hot('-a', { a: signUpCommand(mockPayload) });
  //     const output$ = signUpCommandEpic$(action$, null, dependencies);

  //     expectObservable(output$).toBe('-b', {
  //       b: signUpFailedEvent('Error occurred'),
  //     });
  //   });
  // });
});
