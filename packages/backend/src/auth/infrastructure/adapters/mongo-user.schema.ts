
import { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<MongoUser>;

const options: SchemaOptions = {
  collection: "users"
}

@Schema(options)
export class MongoUser {

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(MongoUser);
