import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostLike } from '@prisma/client';

describe('PostsService', () => {
  let service: PostsService;
  let prismaService: PrismaService;
  let userService: UserService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PrismaService, UserService, EventEmitter2],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getReplies', () => {
    it('should return replies to a post', async () => {
      // Setup
      const postId = '1';
      const mockReplies: Post[] = [
        {
          id: '2',
          title: 'Reply 1',
          description: 'Description of Reply 1',
          content: 'Content of Reply 1',
          publishedAt: new Date(),
          reportedAmount: 0,
          minToRead: '2 min',
          public: true,
          authorId: 'author_id',
          replyToPostId: postId,
          postLikeCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          title: 'Reply 2',
          description: 'Description of Reply 2',
          content: 'Content of Reply 2',
          publishedAt: new Date(),
          reportedAmount: 0,
          minToRead: '3 min',
          public: true,
          authorId: 'author_id',
          replyToPostId: postId,
          postLikeCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest
        .spyOn(prismaService.post, 'findMany')
        .mockResolvedValueOnce(mockReplies);

      // Execution
      const result = await service.getReplies(postId);

      // Expectation
      expect(result).toEqual(mockReplies);
    });
  });
  describe('create', () => {
    it('should create a new post', async () => {
      // Setup
      const createPostDto: CreatePostDto = {
        authorId: '1',
        title: 'Test Post',
        content: 'This is a test post',
        publishedAt: new Date(),
        replyToPostId: null,
      };
      const mockPost: Post = {
        id: '1',
        title: 'Mock Post Title',
        description: 'Mock Post Description',
        content: 'Mock Post Content',
        publishedAt: new Date(),
        reportedAmount: 0,
        minToRead: '5 min',
        public: true,
        authorId: 'author_id',
        replyToPostId: null,
        postLikeCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockUser = {
        id: '1',
        email: 'testuser@example.com',
        name: 'Test User',
        prefix: null,
        password: '@userpass',
        phone: null,
        bio: null,
        occupation: null,
        specialty: null,
        medicalLicenseNumber: null,
        yearsOfExperience: 4,
        profileUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(prismaService.post, 'create').mockResolvedValueOnce(mockPost);

      const result = await service.create(createPostDto);

      // Expectation
      expect(result).toEqual(mockPost);
    });

    it('should throw an error if user not found', async () => {
      // Setup
      const createPostDto: CreatePostDto = {
        authorId: '1',
        title: 'Test Post',
        content: 'This is a test post',
        publishedAt: new Date(),
        replyToPostId: null,
      };
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(null);

      await expect(service.create(createPostDto)).rejects.toThrowError(
        'User not found',
      );
    });
  });
});
