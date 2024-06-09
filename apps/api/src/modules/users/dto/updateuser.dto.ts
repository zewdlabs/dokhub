import { IsOptional, IsString, IsInt, IsBoolean } from 'class-validator';
// import { VerificationStatus, Role } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  prefix?: string;

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
  @IsBoolean()
  onboardingStatus?: boolean;
}
