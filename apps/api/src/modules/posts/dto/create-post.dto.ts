import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePostDto
  implements
    Omit<
      Post,
      'id' | 'createdAt' | 'updatedAt' | 'reportedAmount' | 'published'
    >
{
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  published: boolean;

  @IsString()
  @ApiProperty()
  authorId: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  replyToPostId: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  metadata: string | null;
}
