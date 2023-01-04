import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();

    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.model.findOne({
      userName: createUserDto.userName,
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }
    user.userName = createUserDto.userName;
    user.password = await this.authService.hashPassword(createUserDto.password);
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    const data = await new this.model({
      ...user,
      token: this.authService.getTokenForUser(user),
    }).save();

    return data;
  }
}
