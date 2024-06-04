import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto implements Omit<Prisma.PostCreateInput, 'author'> {
  @IsString()
  @ApiProperty()
  title: string;

  @IsBoolean()
  @ApiProperty()
  public?: boolean;

  @IsString()
  @ApiProperty()
  content: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  publishedAt: Date | null;

  @IsString()
  @ApiProperty()
  authorId: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  replyToPostId: string | null;
}
