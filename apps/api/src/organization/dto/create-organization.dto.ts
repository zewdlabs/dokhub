import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  location?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  institutionLicenseNumber?: string;
}
