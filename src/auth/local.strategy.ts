import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-local';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {
    super();
  }

  public async validate(userName: string, password: string): Promise<any> {
    const user = await this.model.findOne({ userName });

    if (!user) {
      this.logger.debug(`User ${userName} not found`);
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`Password for user ${userName} does not exits`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
