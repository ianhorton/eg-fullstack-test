import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtTokenServiceAdapter } from './adapters/jwt-token.service';
import { MongoUserRepositoryAdapter } from './adapters/mongo-user.repository';
import { User, UserSchema } from './adapters/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [
    {
      provide: 'UserRepositoryPort',
      useClass: MongoUserRepositoryAdapter,
    },
    {
      provide: 'TokenServicePort',
      useClass: JwtTokenServiceAdapter,
    },
  ],
  exports: ['UserRepositoryPort', 'TokenServicePort'],
})
export class InfrastructureModule {}
