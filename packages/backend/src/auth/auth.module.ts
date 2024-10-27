import { Module } from '@nestjs/common';

import { AuthService } from './application/auth.service';
import { AuthController } from './auth.controller';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [InfrastructureModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [InfrastructureModule],
})
export class AuthModule {}
