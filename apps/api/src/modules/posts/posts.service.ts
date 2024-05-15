import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/user.service';
import { Post } from '@prisma/client';
import readingDuration from 'reading-duration';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.usersService.findOne(createPostDto.authorId);

    if (!user) {
      throw new Error('User not found');
    }

    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
      },
    });

    await this.prisma.post.update({
      where: { id: post.id },
      data: { author: { connect: { id: user.id } } },
    });

    return post;
  }

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findUserPosts(userId: string): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { authorId: userId },
    });
  }

  async findOne(id: string): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        minToRead: readingDuration(updatePostDto.content || '', {
          emoji: false,
          wordsPerMinute: 200,
        }),
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    });
    return;
  }
}
