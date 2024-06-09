import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '@/modules/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '@/modules/email/email.service';
import { ConfigService } from '@nestjs/config';
// import * as crypto from 'crypto';

import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let userService: UserService;
  let jwtService: JwtService;
  let emailService: EmailService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            emailVerification: {
              create: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendVerificationEmail: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    emailService = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('signUp', () => {
    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'testuser@example.com',
        password: '@drpassword',
        name: 'Dr User',
      };
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(userService, 'createUser').mockResolvedValue({
        id: '1',
        email: 'testuser@example.com',
        password: '@drpassword',
      } as any);
      // jest
      //   .spyOn(prismaService.emailVerification, 'create')
      //   .mockResolvedValue(null);
      // jest.spyOn(emailService, 'sendVerificationEmail').mockResolvedValue(null);
      jest.spyOn(authService, 'getTokens').mockResolvedValue({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        expiresIn: new Date().getTime(),
      });

      const result = await authService.signUp(createUserDto);
      expect(result).toEqual({ message: 'User created successfully' });
    });

    it('should throw BadRequestException if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'testuser@example.com',
        password: '@drpassword',
        name: 'Dr User',
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue({
        id: '1',
        email: 'testuser@example.com',
        password: '@drpassword',
      } as any);

      await expect(authService.signUp(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException for unknown errors', async () => {
      const createUserDto: CreateUserDto = {
        email: 'testuser@example.com',
        password: '@drpassword',
        name: 'Dr User',
      };

      jest
        .spyOn(userService, 'findByEmail')
        .mockRejectedValue(new Error('Unknown error'));

      await expect(authService.signUp(createUserDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const email = 'testuser@example.com';
      const password = '@drpassword';

      const user = {
        id: '1',
        email: 'testuser@example.com',
        password: await bcrypt.hash(password, 10),
        role: 'user',
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(user as any);
      const bcryptCompareMock = jest.fn().mockResolvedValue(true);
      jest.spyOn(bcrypt, 'compare').mockImplementation(bcryptCompareMock);
      jest.spyOn(authService, 'getTokens').mockResolvedValue({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        expiresIn: new Date().getTime(),
      });

      const result = await authService.login(email, password);

      expect(result.tokens).toEqual({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        expiresIn: expect.any(Number),
      });
      expect(result.user).toEqual({
        id: '1',
        email: 'testuser@example.com',
        name: undefined,
        prefix: undefined,
        phone: undefined,
        bio: undefined,
        occupation: undefined,
        specialty: undefined,
        medicalLicenseNumber: undefined,
        yearsOfExperience: undefined,
        verificationStatus: undefined,
        role: 'user',
        followedByCount: undefined,
        followingCount: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        profileUrl: null,
        emailVerified: null,
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const email = 'testuser@example.com';
      const password = '@drpassword';

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(authService.login(email, password)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const email = 'testuser@example.com';
      const password = '@drpassword';

      const user = {
        id: '1',
        email: 'testuser@example.com',
        password: await bcrypt.hash('wrongpassword', 10),
        role: 'user',
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(user as any);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(authService.login(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
