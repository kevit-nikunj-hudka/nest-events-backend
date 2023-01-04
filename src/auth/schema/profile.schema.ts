import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop()
  age: number;

  @Prop()
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: User;
  };
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
