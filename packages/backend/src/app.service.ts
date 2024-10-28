import { Injectable } from '@nestjs/common';
import { ResultFactory, ResultWrapper } from './common/result.wrapper';

@Injectable()
export class AppService {
  getWelcome(): ResultWrapper<string> {
    return ResultFactory.returnSuccess('Welcome to the application.');
  }
}
