import { Response } from 'express';

import { Controller, Get, Logger, Res, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { ResponseBuilder, ResponseWrapper } from './common/response.builder';

@Controller('api')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}
  

  @UseGuards(AuthGuard)
  @Get('welcome')
  getWelcome(
    @Res({ passthrough: true }) res: Response,
  ): ResponseWrapper<string> {
    const r = this.appService.getWelcome();
    const reponse = ResponseBuilder.build(r);
    res.status(reponse.httpStatus);
    this.logger.debug(reponse);
    return reponse;
  }
}
