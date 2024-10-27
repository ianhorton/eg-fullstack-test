import { Body, Controller, Logger, Post } from '@nestjs/common';

import { AuthService } from '../auth/application/auth.service';
import { UserDto } from './application/dtos/user.dto';
import { ResultWrapper } from 'src/common/result.wrapper';
import { ResponseBuilder, ResponseWrapper } from 'src/common/response.builder';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() body: { email: string; name: string; password: string },
  ): Promise<ResponseWrapper<UserDto>> {
    this.logger.debug({ body });
    const result = await this.authService.signUp(
      body.email,
      body.name,
      body.password,
    );
    const reponse = ResponseBuilder.build(result);
    return reponse;
  }

  @Post('sign-in')
  async signIn(
    @Body() body: { email: string; password: string },
  ): Promise<ResponseWrapper<{ token: string }>> {
    const result = await this.authService.signIn(body.email, body.password);
    const reponse = ResponseBuilder.build(result);
    return reponse;
  }
}