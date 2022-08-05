import { AttendeeService } from './attendees.service';
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
} from '@nestjs/common';
import { CreateAttendeeDto } from './dto/attendee.dto';

@Controller('attendees')
export class AttendeesController {
  private readonly logger = new Logger(AttendeesController.name);

  constructor(private readonly attendeeService: AttendeeService) {}

  // create a new Attendee
  @Post()
  async create(@Res() response, @Body() input: CreateAttendeeDto) {
    const newAttendee = await this.attendeeService.create(input);
    return response.status(HttpStatus.CREATED).json({
      newAttendee,
    });
  }

  // get all Attendee of given event
  @Get()
  async getAllAttendee(@Res() response) {
    this.logger.log('Hit the getAllAttendees routes');
    const allAttendee = await this.attendeeService.getAttendees();
    this.logger.debug(`Found ${allAttendee.length} events`);
    return response.status(HttpStatus.OK).json({ allAttendee });
  }

  // get Attendee by Id
  @Get('/:id')
  async getAttendeeById(@Res() response, @Param('id') id) {
    console.log(typeof id);
    const attendee = await this.attendeeService.getAttendee(id);
    return response.status(HttpStatus.OK).json({ attendee });
  }

  // update Attendee by Id
  @Patch('/:id')
  async updateAttendeeById(
    @Res() response,
    @Param('id') id,
    @Body() input: CreateAttendeeDto,
  ) {
    const updateAtt = await this.attendeeService.updateAttendee(id, input);
    return response.status(HttpStatus.OK).json({ updateAtt });
  }

  // delete Attendee by Id
  @Delete('/:id')
  async deleteAttendeeById(@Res() response, @Param('id') id) {
    const deleteAtt = await this.attendeeService.deleteAttendee(id);
    return response.status(HttpStatus.OK).json({ deleteAtt });
  }
}
