import { Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  userName: string;

  @Length(8)
  password: string;

  @Length(8)
  retypedPassword: string;

  @Length(3)
  firstName: string;

  @Length(3)
  lastName: string;

  @IsEmail()
  email: string;
}
