import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ unique: true })
  userName: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
