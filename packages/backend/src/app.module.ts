import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessModule } from './access/access.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    //ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://localhost:/"),
    //AccessModule,
    //UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
