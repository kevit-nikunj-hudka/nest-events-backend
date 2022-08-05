import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeeService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { Attendee, AttendeeSchema } from './schema/attendee.schema';
import EventModule from 'src/events/event.module';

@Module({
  providers: [AttendeeService],
  controllers: [AttendeesController],
  imports: [
    EventModule,
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema },
    ]),
  ],
})
export default class AttendeeModule {}
