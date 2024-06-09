import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  speciality?: string;

  @IsOptional()
  @IsString()
  medicalLicenseNumber?: string;

  @IsOptional()
  @IsInt()
  yearsOfExperience?: number;
}
