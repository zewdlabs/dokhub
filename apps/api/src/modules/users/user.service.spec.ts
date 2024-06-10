import { Test, TestingModule } from '@nestjs/testing';
import { UserService, roundsOfHashing } from './user.service';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Prisma, User, VerificationStatus, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    prefix: null,
    password: 'hashedpassword',
    phone: null,
    bio: null,
    occupation: null,
    specialty: null,
    medicalLicenseNumber: null,
    yearsOfExperience: null,
    profileUrl: null,
    verificationStatus: VerificationStatus.INCOMPLETE,
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
    refreshToken: null,
    followedByCount: 0,
    followingCount: 0,
    emailVerified: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(mockUser),
              findUniqueOrThrow: jest.fn().mockResolvedValue(mockUser),
              findMany: jest.fn().mockResolvedValue([mockUser]),
              create: jest.fn().mockResolvedValue(mockUser),
              update: jest.fn().mockResolvedValue(mockUser),
              delete: jest.fn().mockResolvedValue(mockUser),
            },
            follows: {
              create: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = await service.findOne('1');
      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);
      const user = await service.findOne('1');
      expect(user).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User',
      };
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashpassword' as never);
      const user = await service.createUser(createUserDto);
      expect(user).toEqual(mockUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: 'hashedpassword',
        },
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserDto = { name: 'Updated User' };
      const user = await service.updateUser({
        where: { id: '1' },
        data: updateUserDto,
      });

      expect(user).toEqual(mockUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateUserDto,
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = await service.deleteUser({ id: '1' });

      expect(user).toEqual(mockUser);
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updateUserDto = { bio: 'New bio' };
      const user = await service.updateProfile('1', updateUserDto);

      expect(user).toEqual(mockUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateUserDto,
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      await expect(
        service.updateProfile('1', { bio: 'New bio' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = await service.getAllUsers();
      expect(users).toEqual([mockUser]);
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('getAllVerifiedUsers', () => {
    it('should return all verified users', async () => {
      const verifiedUsers = await service.getAllVerifiedUsers();
      expect(verifiedUsers).toEqual([mockUser]);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        where: { verificationStatus: VerificationStatus.VERIFIED },
        include: { posts: true },
      });
    });
  });

  describe('getUserForProfile', () => {
    it('should return a user for profile', async () => {
      const user = await service.getUserForProfile('1');
      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          socialLinks: true,
          following: true,
          followedBy: true,
          memberships: true,
        },
      });
    });
  });

  describe('updateUserRole', () => {
    it('should update the user role', async () => {
      const user = await service.updateUserRole('1', Role.ADMIN);
      expect(user).toEqual(mockUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { role: Role.ADMIN },
      });
    });
  });

  describe('validateUser', () => {
    it('should validate the user', async () => {
      const user = await service.validateUser('1');
      expect(user).toEqual(mockUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { verificationStatus: VerificationStatus.VERIFIED },
      });
    });
  });

  describe('updateProfilePath', () => {
    it('should update the user profile URL', async () => {
      const user = await service.updateProfilePath('1', 'new-url');
      expect(user).toEqual(mockUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { profileUrl: 'new-url' },
      });
    });
  });

  describe('updateUserFollowing', () => {
    it('should update the user following', async () => {
      const userToFollow = { ...mockUser, id: '2' };
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(userToFollow);

      await service.updateUserFollowing('1', '2');

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '2' },
      });
      expect(prismaService.follows.create).toHaveBeenCalledTimes(2);
      expect(prismaService.follows.create).toHaveBeenCalledWith({
        data: {
          followedById: '1',
          followingId: '2',
        },
      });
      expect(prismaService.follows.create).toHaveBeenCalledWith({
        data: {
          followedById: '2',
          followingId: '1',
        },
      });
    });
  });

  describe('searchUsersByName', () => {
    it('should search users by name or email', async () => {
      const users = await service.searchUsersByName('Test');
      expect(users).toEqual([mockUser]);
      expect(prismaService.user.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              name: {
                contains: 'Test',
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: 'Test',
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    });
  });

  describe('unfollowUser', () => {
    it('should unfollow a user', async () => {
      const userToUnfollow = { ...mockUser, id: '2' };
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(userToUnfollow);

      await service.unfollowUser('1', '2');

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '2' },
      });
      expect(prismaService.follows.deleteMany).toHaveBeenCalledTimes(2);
      expect(prismaService.follows.deleteMany).toHaveBeenCalledWith({
        where: {
          followedById: '1',
          followingId: '2',
        },
      });
      expect(prismaService.follows.deleteMany).toHaveBeenCalledWith({
        where: {
          followedById: '2',
          followingId: '1',
        },
      });
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const user = await service.findByEmail('test@example.com');
      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null if user is not found by email', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);
      const user = await service.findByEmail('test@example.com');
      expect(user).toBeNull();
    });
  });
});
