import { IsString, Length } from 'class-validator';

export class CreateAttendeeDto {
  @IsString()
  @Length(3, 255, { message: 'The name lenght is wrong' })
  name: string;
  event: number;
}
