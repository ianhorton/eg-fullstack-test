import { Body, Controller, Post } from '@nestjs/common';
import { AccessService } from './access.service';
import { UserService } from '../user/user.service';

@Controller('access')
export class AccessController {
  constructor(
    private readonly accessService: AccessService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: any) {
    const { email, name, password } = body;
    return this.userService.signUp(email, name, password);
  }

  @Post('sign-in')
  async signIn(@Body() body: any) {
    const { email, password } = body;
    const user = await this.accessService.validateUser(email, password);
    return this.accessService.login(user);
  }
}
