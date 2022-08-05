import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventsController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schema/event.schema';

@Module({
  providers: [EventService],
  controllers: [EventsController],
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  exports: [EventService],
})
export default class EventModule {}
