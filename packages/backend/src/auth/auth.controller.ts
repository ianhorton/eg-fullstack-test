import { Body, Controller, Logger, Post } from '@nestjs/common';

import { AuthService } from '../auth/application/auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body() body: { email: string; name: string; password: string },
  ): Promise<void> {
    this.logger.debug({ body });
    return this.authService.signUp(body.email, body.name, body.password);
  }

  @Post('sign-in')
  async signIn(
    @Body() body: { email: string; password: string },
  ): Promise<{ token: string }> {
    const token = await this.authService.signIn(body.email, body.password);
    return { token };
  }
}
