import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role, User, VerificationStatus } from '@prisma/client'; // Import your Prisma user model
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '@/modules/auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { mapUserDto } from '../../utils/mapper.utils';
import { UserDto } from '../auth/dto/user.dto';
// import { UserDto } from '../auth/dto/user.dto';

export const roundsOfHashing = 10;
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

  async getToFollowUsers(userId: string): Promise<User[]> {
    const usersFollowed = await this.prisma.follows.findMany({
      where: {
        followingId: userId,
      },
    });

    return this.prisma.user.findMany({
      orderBy: {
        followedByCount: 'desc',
      },
      where: {
        NOT: {
          id: {
            in: usersFollowed.map((user) => user.followedById) && [userId],
          },
        },
      },
      take: 10,
    });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    this.logger.log('userById');
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { posts: {} },
    });

    return user;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }
  async getAllUsers() {
    this.logger.log('getAllUsers');
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getAllVerifiedUsers() {
    const users = await this.prisma.user.findMany({
      where: { verificationStatus: VerificationStatus.VERIFIED },
      include: {
        posts: true,
      },
    });
    return users;
  }

  async getAllVerifications() {
    const users = await this.prisma.user.findMany({
      where: { verificationStatus: VerificationStatus.PENDING },
    });
    return users;
  }

  async findAll(verificationStatus?: VerificationStatus): Promise<User[]> {
    const filter = verificationStatus ? { verificationStatus } : {}; // Build filter object
    return await this.prisma.user.findMany({ where: filter });
  }

  async getUserForProfile(id: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        socialLinks: true,
        following: true,
        followedBy: true,
        memberships: true,
      },
    });
  }

  async getUsersByVerificationStatus(status?: VerificationStatus) {
    return this.prisma.user.findMany({
      where: {
        verificationStatus: status,
      },
    });
  }
  async createUser(data: CreateUserDto): Promise<User> {
    this.logger.log('createUser');
    const hashedPassword = await bcrypt.hash(data.password, roundsOfHashing);
    data.password = hashedPassword;
    const userData: Prisma.UserCreateInput = { ...data };
    const createdUser = await this.prisma.user.create({
      data: userData,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const membership = await this.prisma.membership.create({
    //   data: {
    //     userId: createdUser.id,
    //     role: Role.USER,
    //   },
    // });
    return createdUser;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    this.logger.log('updateUser');
    const updateUser = await this.prisma.user.update({
      where: params.where,
      data: { ...params.data },
    });
    return updateUser;
  }

  async updateProfile(
    userId: string,
    partialUpdateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...partialUpdateUserDto,
        verificationStatus:
          user.verificationStatus === 'INCOMPLETE' &&
          partialUpdateUserDto.medicalLicenseNumber
            ? 'PENDING'
            : 'INCOMPLETE',
      },
    });
  }
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    this.logger.log('deleteUser');
    const deleteUser = await this.prisma.user.delete({
      where,
    });
    return deleteUser;
  }

  async updateUserRole(userId: string, newRole: Role): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
  }

  async validateUser(
    userId: string,
    verificationStatus: VerificationStatus,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { verificationStatus: verificationStatus },
    });
  }
  async updateProfilePath(userId: string, url: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { profileUrl: url },
    });
  }

  async updateUserFollowing(
    userId: string,
    userToFollowId: string,
  ): Promise<void> {
    // Check if the user exists
    await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userToFollowId,
      },
    });

    await this.prisma.follows.create({
      data: {
        followedById: userId,
        followingId: userToFollowId,
      },
    });

    await this.prisma.user.update({
      where: { id: userToFollowId },
      data: {
        followedByCount: {
          increment: 1,
        },
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        followingCount: {
          increment: 1,
        },
      },
    });
  }

  async searchUsersByName(name: string): Promise<UserDto[] | UserDto> {
    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                name: {
                  contains: name,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: name,
                  mode: 'insensitive',
                },
              },
            ],
          },
          {
            role: {
              not: Role.SUADMIN,
            },
          },
        ],
      },
      // omit: ['password', 'refreshToken'] as Array<keyof User>, // Specify properties you want to exclude
    });

    if (users.length === 0) {
      throw new NotFoundException(
        'No users found with the given name or email',
      );
    }

    return mapUserDto(users);
  }
  async unfollowUser(userId: string, userToUnfollowId: string): Promise<void> {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user to unfollow exists
    const userToUnfollow = await this.prisma.user.findUnique({
      where: { id: userToUnfollowId },
    });
    if (!userToUnfollow) {
      throw new NotFoundException('User to unfollow not found');
    }

    // Delete the follow relationship
    await this.prisma.follows.deleteMany({
      where: {
        followedById: userId,
        followingId: userToUnfollowId,
      },
    });

    // Optional: you might also want to delete the reciprocal follow relationship
    await this.prisma.follows.deleteMany({
      where: {
        followedById: userToUnfollowId,
        followingId: userId,
      },
    });
  }
}
