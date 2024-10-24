import { Module } from '@nestjs/common';

import { AuthService } from './application/auth.service';
import { AuthController } from './auth.controller';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [AuthService],
  controllers: [AuthController],
})

export class AuthModule { }