import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../ports/user.repository';
import { User as UserSchema } from './user.schema';

@Injectable()
export class MongoUserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
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
