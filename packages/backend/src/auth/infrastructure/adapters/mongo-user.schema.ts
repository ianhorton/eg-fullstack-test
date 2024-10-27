import { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<MongoUser>;

const options: SchemaOptions = {
  collection: 'users',
};

@Schema(options)
export class MongoUser {
  // @Prop({ type: String, required: true, unique: true })
  // userId: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(MongoUser);
