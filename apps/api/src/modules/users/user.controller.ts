import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role, User as UserModel } from '@prisma/client';
// import CreatePlatformUserInput from './inputs/create-user-dto';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { AccessTokenGuard } from '@/modules/auth/guards/accessToken.guard';
import { Roles } from '@/modules/auth/role.decorate';
import { RoleGuard } from '@/modules/auth/guards/role.guard';
import CreateUserDto from '@/modules/auth/dto/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async getUser(@Param('id') id: string) {
    return this.userService.user({ id: id });
  }

  @Post()
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { email: string; name: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: id },
      data: userData,
    });
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}
