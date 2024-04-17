import { IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  email!: string;

  @IsString()
  fullName!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password!: string;
}
