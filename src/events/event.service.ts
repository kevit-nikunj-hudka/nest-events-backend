import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schema/event.schema';
import { CreateEventDto } from './dto/event.dto';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly model: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await new this.model({
      ...createEventDto,
    }).save();
  }

  async getEvents(): Promise<Event[]> {
    return await this.model.aggregate([
      {
        $lookup: {
          from: 'attendees',
          localField: '_id',
          foreignField: 'event',
          as: 'attendees',
        },
      },
    ]);
  }

  async getEvent(id): Promise<Event> {
    return await this.model.findById(id).exec();
  }

  public async createEvent(input: CreateEventDto, user: User): Promise<Event> {
    return await new this.model({
      input,
      organizer: user,
    }).save();
  }

  async updateEvent(id, input): Promise<Event> {
    return await this.model.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  async deleteEvent(id): Promise<Event> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
