import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role, User, VerificationStatus } from '@prisma/client'; // Import your Prisma user model
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '@/modules/auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

export const roundsOfHashing = 10;
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

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
      where: { verificationStatus: VerificationStatus.INCOMPLETE },
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
      data: params.data,
    });
    return updateUser;
  }

  async updateProfile(
    userId: string,
    partialUpdateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user profile with the provided data
    console.log('0000000000000000000000000000000', partialUpdateUserDto);
    return await this.prisma.user.update({
      where: { id: userId },
      data: { ...partialUpdateUserDto },
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

  async validateUser(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { verificationStatus: VerificationStatus.VERIFIED },
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
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user to follow exists
    const userToFollow = await this.prisma.user.findUnique({
      where: { id: userToFollowId },
    });
    if (!userToFollow) {
      throw new Error('User to follow not found');
    }
    await this.prisma.follows.create({
      data: {
        followedById: userId,
        followingId: userToFollowId,
      },
    });

    // Update the followedBy list and counts for the user being followed
    await this.prisma.follows.create({
      data: {
        followedById: userToFollowId,
        followingId: userId,
      },
    });
  }
  async searchUsersByName(name: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
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
    });

    if (users.length === 0) {
      throw new NotFoundException(
        'No users found with the given name or email',
      );
    }

    return users;
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
