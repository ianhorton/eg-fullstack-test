import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from '../auth/application/auth.service';
import { ResponseBuilder, ResponseWrapper } from '../common/response.builder';
import { UserDto } from './application/dtos/user.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() body: { email: string; name: string; password: string },
  ): Promise<ResponseWrapper<UserDto>> {
    this.logger.debug({ body });
    const result = await this.authService.signUp(
      body.email,
      body.name,
      body.password,
    );
    const reponse = ResponseBuilder.build(result);
    res.status(reponse.httpStatus);
    this.logger.debug(reponse);
    return reponse;
  }

  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() body: { email: string; password: string },
  ): Promise<ResponseWrapper<{ token: string }>> {
    this.logger.debug({ body });
    const result = await this.authService.signIn(body.email, body.password);
    const reponse = ResponseBuilder.build(result);
    res.status(reponse.httpStatus);
    this.logger.debug(reponse);
    return reponse;
  }
}
