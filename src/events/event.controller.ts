import { Event } from './schema/event.schema';
import { EventService } from './event.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/event.dto';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}
  private events: Event[] = [];

  @Post()
  async create(@Body() input: CreateEventDto) {
    console.log(input);
    return await this.eventService.create(input);
  }
}
