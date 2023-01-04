import { EventService } from './event.service';
import {
  Get,
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Param,
  Patch,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { CreateEventDto } from './dto/event.dto';
import { UpdateEventDto } from './dto/event.update.dto';
import { CurrentUser } from 'src/auth/current-user.deorator';
import { User } from 'src/auth/schema/user.schema';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventService: EventService) {}

  // create a new Event
  @Post()
  @UseGuards(AuthGuardJwt)
  async create(
    @Res() response,
    @Body() input: CreateEventDto,
    @CurrentUser() user: User,
  ) {
    const newEvent = await this.eventService.createEvent(input, user);

    return response.status(HttpStatus.CREATED).json({
      newEvent,
      organiser: user,
    });
  }

  // get all Events
  @Get()
  async getAllEvents(@Res() response) {
    this.logger.log('Hit the getAllEvents routes');
    const allEvents = await this.eventService.getEvents();
    this.logger.debug(`Found ${allEvents.length} events`);
    return response.status(HttpStatus.OK).json({ allEvents });
  }

  // get Event by Id
  @Get('/:id')
  async getEventById(@Res() response, @Param('id') id) {
    console.log(typeof id);
    const event = await this.eventService.getEvent(id);
    return response.status(HttpStatus.OK).json({ event });
  }

  // update Event by Id
  @Patch('/:id')
  async updateEventById(
    @Res() response,
    @Param('id') id,
    @Body() input: UpdateEventDto,
  ) {
    const updateEvent = await this.eventService.updateEvent(id, input);
    return response.status(HttpStatus.OK).json({ updateEvent });
  }

  // delete Event by Id
  @Delete('/:id')
  async deleteEventById(@Res() response, @Param('id') id) {
    const deleteEvent = await this.eventService.deleteEvent(id);
    return response.status(HttpStatus.OK).json({ deleteEvent });
  }
}
