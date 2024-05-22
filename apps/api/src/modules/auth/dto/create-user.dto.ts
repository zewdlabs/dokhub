import { Role } from '@prisma/client';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsAlphanumeric,
} from 'class-validator';
// import { Role } from '@prisma/client';

class CreateUserDto {
  @IsOptional()
  @IsString()
  prefix?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsInt()
  yearsOfExperience?: number;

  @IsOptional()
  @IsString()
  medicalLicenseNumber?: string;

  //   @IsOptional()
  //   @IsNotEmpty({ each: true })
  //   socialLinks?: string[];

  @IsOptional()
  @IsAlphanumeric()
  role: Role;
}

export default CreateUserDto;
