import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/user.service';
import { Library, Post, PostLike } from '@prisma/client';
import readingDuration from 'reading-duration';
import { PostPublishedEvent } from './events/post-published.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getReplies(postId: string): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { replyToPostId: postId },
      include: { author: true },
    });
  }

  async addToUsersLibrary(userId: string, postId: string): Promise<Library> {
    if (
      await this.prisma.library.findUnique({
        where: {
          unique_library: {
            userId: userId,
            postId: postId,
          },
        },
      })
    ) {
      return this.prisma.library.findUniqueOrThrow({
        where: {
          unique_library: {
            userId: userId,
            postId: postId,
          },
        },
      });
    }

    return this.prisma.library.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
  }

  async removeFromLibrary(userId: string, postId: string): Promise<Library> {
    return this.prisma.library.delete({
      where: {
        unique_library: {
          userId: userId,
          postId: postId,
        },
      },
    });
  }

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

  async replyToPost(
    postId: string,
    replyPostDto: CreatePostDto,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    await this.prisma.post.update({
      where: { id: postId },
      data: {
        postRepliesCount: {
          increment: 1,
        },
      },
    });

    return await this.prisma.post.create({
      data: {
        ...replyPostDto,
        replyToPostId: postId,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: {
        publishedAt: { not: null },
      },
      include: { author: true },
    });
  }

  async findUserFollowingPosts(userId: string): Promise<Partial<Post>[]> {
    const follows = await this.prisma.follows.findMany({
      where: { followedById: userId },
    });

    const posts = await this.prisma.post.findMany({
      where: {
        authorId: {
          in: follows.map((follow) => follow.followedById),
        },
        publishedAt: { not: null },
      },
      include: { author: true },
    });

    return posts.filter((post) => post.authorId !== userId);
  }

  async searchPostsByName(name: string): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: {
        title: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        author: true,
      },
    });
  }

  async likePost(postId: string, userId: string): Promise<PostLike> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { postLikes: true },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    // Check if the user has already liked the post

    if (post.postLikes.filter((postlike) => postlike.userId == userId)) {
      throw new Error('User has already liked this post');
      // await this.prisma.postLike.deleteMany({
      //   where: {
      //     userId: userId,
      //     postId: postId,
      //   },
      // });
      // await this.prisma.post.update({
      //   where: { id: postId },
      //   data: {
      //     postLikeCount: {
      //       increment: -1,
      //     },
      //   },
      // });
    }

    // Create a new like
    const postLike = await this.prisma.postLike.create({
      data: {
        postId,
        userId,
      },
    });

    // Update the like count on the post
    await this.prisma.post.update({
      where: { id: postId },
      data: {
        postLikeCount: {
          increment: 1,
        },
      },
    });
    return postLike;
  }
  async findUserForyouPosts(userId: string): Promise<Partial<Post>[]> {
    const posts = await this.prisma.forYou.findMany({
      where: { userId: userId },
      select: {
        post: {
          include: {
            author: true,
          },
        },
      },
    });

    const bestPosts = await this.prisma.post.findMany({
      where: {
        publishedAt: { not: null },
      },
      orderBy: {
        postLikes: {
          _count: 'desc',
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        publishedAt: true,
        authorId: true,
        minToRead: true,
        author: true,
      },
      take: 10,
    });

    return [
      ...posts.map((item) => item.post),
      ...bestPosts.filter(
        (post) =>
          !posts.find((p) => p.post.id === post.id) && post.authorId !== userId,
      ),
    ];
  }

  async findUserDrafts(userId: string): Promise<Partial<Post>[]> {
    return await this.prisma.post.findMany({
      where: { authorId: userId, publishedAt: null },
      select: {
        id: true,
        title: true,
        description: true,
        publishedAt: true,
        authorId: true,
        minToRead: true,
        author: true,
      },
    });
  }

  async findUserLibrary(userId: string): Promise<Partial<Post>[]> {
    const library = await this.prisma.library.findMany({
      where: { userId: userId },
      select: {
        post: {
          include: {
            author: true,
          },
        },
      },
    });

    return library.map((item) => item.post);
  }

  async findUserPublishedPosts(userId: string): Promise<Partial<Post>[]> {
    return await this.prisma.post.findMany({
      where: { authorId: userId, publishedAt: { not: null } },
      select: {
        id: true,
        title: true,
        description: true,
        publishedAt: true,
        authorId: true,
        minToRead: true,
        author: true,
      },
    });
  }

  async findOne(id: string): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        replies: true,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    const data = await this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        minToRead: readingDuration(updatePostDto.content || post!.content!, {
          emoji: false,
          wordsPerMinute: 200,
        }),
      },
    });

    if (data.publishedAt) {
      const postPublishedEvent = new PostPublishedEvent();
      postPublishedEvent.post = data;
      const user = await this.usersService.findOne(data.authorId);
      if (user) {
        postPublishedEvent.author = user;
      }

      this.eventEmitter.emit('post.published', postPublishedEvent);
    }

    return data;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    });
    return;
  }
}
