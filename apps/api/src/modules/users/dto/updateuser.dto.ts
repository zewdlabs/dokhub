import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';
// import { VerificationStatus, Role } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  prefix?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsString()
  medicalLicenseNumber?: string;

  @IsOptional()
  @IsInt()
  yearsOfExperience?: number;

  @IsOptional()
  @IsString()
  profileUrl?: string;

  //   @IsOptional()
  //   @IsEnum(VerificationStatus)
  //   verificationStatus?: VerificationStatus;

  //   @IsOptional()
  //   @IsEnum(Role)
  //   role?: Role;

  // Add other fields as needed
}
