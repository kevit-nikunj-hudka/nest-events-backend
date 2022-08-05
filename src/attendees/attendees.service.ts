import { Injectable, NotFoundException } from '@nestjs/common';
import { EventService } from 'src/events/event.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendee, AttendeeDocument } from './schema/attendee.schema';
import { CreateAttendeeDto } from './dto/attendee.dto';

@Injectable()
export class AttendeeService {
  constructor(
    @InjectModel(Attendee.name) private readonly model: Model<AttendeeDocument>,
    private readonly eventService: EventService,
  ) {}

  async create(createAttendeeDto: CreateAttendeeDto): Promise<Attendee> {
    const { event } = createAttendeeDto;
    const events = await this.eventService.getEvent(event);
    if (!events) {
      throw new NotFoundException();
    }
    return await new this.model({
      ...createAttendeeDto,
    }).save();
  }

  async getAttendees(): Promise<Attendee[]> {
    return await this.model.find().populate('event').exec();
  }

  async getAttendee(id): Promise<Attendee> {
    return await this.model.findById(id).exec();
  }

  async updateAttendee(id, input): Promise<Attendee> {
    return await this.model.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  async deleteAttendee(id): Promise<Attendee> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
