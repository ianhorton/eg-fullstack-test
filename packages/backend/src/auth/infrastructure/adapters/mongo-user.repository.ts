import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../ports/user.repository';
import { MongoUser } from './mongo-user.schema';

@Injectable()
export class MongoUserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectModel(MongoUser.name) private userModel: Model<MongoUser>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await this.userModel.findOne({ email }).exec();
    if (!userRecord) return null;
    return new User(userRecord.email, userRecord.passwordHash);
  }

  async create(user: User): Promise<void> {
    const newUser = new this.userModel({
      email: user.email,
      passwordHash: user.getPasswordHash(),
    });
    await newUser.save();
  }
  
}
