import { ResultWrapper } from './result.wrapper';

export interface ResponseWrapper<T = undefined> {
  readonly success: boolean;
  readonly payload?: T | undefined;
  readonly message?: string;
}

export class ResponseBuilder {
  static build<T>(
    result: ResultWrapper<T> | ResultWrapper<void>,
  ): ResponseWrapper<T> {
    if (result.isSuccess) {
      return {
        success: true,
        payload: result.payload as T,
      };
    }

    if (result.isError) {
      return {
        success: false,
        message: 'Unexpected error occurred.',
      };
    }

    return {
      success: false,
      message: result.message,
    };
  }
}
