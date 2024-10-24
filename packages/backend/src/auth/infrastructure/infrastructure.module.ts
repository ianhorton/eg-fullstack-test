import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtTokenServiceAdapter } from './adapters/jwt-token.service';
import { MongoUserRepositoryAdapter } from './adapters/mongo-user.repository';
import { MongoUser, UserSchema } from './adapters/mongo-user.schema';
import { BcryptPasswordServiceAdapter } from './adapters/bcrypt-password.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MongoUser.name, schema: UserSchema }])],
  providers: [
    {
      provide: 'PasswordServicePort',
      useClass: BcryptPasswordServiceAdapter,
    },
    {
      provide: 'UserRepositoryPort',
      useClass: MongoUserRepositoryAdapter,
    },
    {
      provide: 'TokenServicePort',
      useClass: JwtTokenServiceAdapter,
    },
  ],
  exports: ['PasswordServicePort', 'UserRepositoryPort', 'TokenServicePort'],
})

export class InfrastructureModule { }
