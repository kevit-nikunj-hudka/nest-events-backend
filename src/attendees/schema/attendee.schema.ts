import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Event } from 'src/events/schema/event.schema';
import { Type } from 'class-transformer';

export type AttendeeDocument = Attendee & Document;

@Schema()
export class Attendee {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Event.name })
  @Type(() => Event)
  event: Event;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);
