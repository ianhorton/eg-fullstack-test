export interface ResultWrapper<T = void> {
  readonly isError: boolean;
  readonly isSuccess: boolean;
  readonly payload?: T;
  readonly message?: string;
}

export class ResultFactory {
  static returnSuccess<T>(payload: T): ResultWrapper<T> {
    return {
      isError: false,
      isSuccess: true,
      payload,
    };
  }

  static returnFailed(message: string): ResultWrapper {
    return {
      isError: false,
      isSuccess: false,
      message,
    };
  }

  static returnFailedError(message: string): ResultWrapper {
    return {
      isError: true,
      isSuccess: false,
      message,
    };
  }
}