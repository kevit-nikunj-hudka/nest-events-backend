import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  when: string;

  @Prop()
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  organiser: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.virtual('Attendee', {
  ref: 'Attendee',
  localField: '_id',
  foreignField: 'event',
});
