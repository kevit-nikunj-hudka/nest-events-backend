import { IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(3, 255, { message: 'The name lenght is wrong' })
  name: string;

  @Length(5, 255)
  description: string;

  @IsString()
  when: Date;

  @IsString()
  @Length(5, 255)
  address: string;
}
