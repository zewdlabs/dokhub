import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client'; // Import your Prisma user model
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from '@/auth/dto/create-user.dto';

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
    });
    return user;
  }
  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
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

  async createUser(data: CreateUserDto): Promise<User> {
    this.logger.log('createUser');
    const hashedPassword = await bcrypt.hash(data.password, roundsOfHashing);
    data.password = hashedPassword;
    const userData: Prisma.UserCreateInput = { ...data };
    const createUser = await this.prisma.user.create({
      data: userData,
    });
    return createUser;
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

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    this.logger.log('deleteUser');
    const deleteUser = await this.prisma.user.delete({
      where,
    });
    return deleteUser;
  }
}
