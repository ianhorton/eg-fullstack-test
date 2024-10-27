import { HttpStatus } from '@nestjs/common';
import { ResultWrapper } from './result.wrapper';

export interface ResponseWrapper<T = void> {
  readonly success: boolean;
  readonly payload?: T | undefined;
  readonly message?: string;
  readonly httpStatus: HttpStatus;
}

export class ResponseBuilder {
  static build<T>(
    result: ResultWrapper<T> | ResultWrapper<void>,
  ): ResponseWrapper<T> {
    if (result.isSuccess) {
      return {
        success: true,
        payload: result.payload as T,
        httpStatus: HttpStatus.CREATED,
      };
    }

    if (result.isError) {
      return {
        success: false,
        message: 'Unexpected error occurred.',
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }

    return {
      success: false,
      message: result.message,
      httpStatus: HttpStatus.FORBIDDEN,
    };
  }
}
