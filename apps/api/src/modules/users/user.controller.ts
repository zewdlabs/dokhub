import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role, User as UserModel, VerificationStatus } from '@prisma/client';
// import CreatePlatformUserInput from './inputs/create-user-dto';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { AccessTokenGuard } from '@/modules/auth/guards/accessToken.guard';
import { Roles } from '@/modules/auth/decorators/role.decorate';
import { RoleGuard } from '@/modules/auth/guards/role.guard';
import CreateUserDto from '@/modules/auth/dto/create-user.dto';
// import { VerificationGuard } from '../auth/guards/post.guard';
// import { Verification } from '../auth/decorators/verificationstatus.decorate';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUADMIN)
  // @Verification(VerificationStatus.INCOMPLETE)
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

  @Get('profile/:id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async getUserForProfile(@Param('id') id: string) {
    return this.userService.getUserForProfile(id);
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

  @Get('getAll')
  // @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async findAll(
    @Param('verificationStatus') verificationStatus?: VerificationStatus,
  ): Promise<any> {
    console.log(verificationStatus);
    return { message: 'hello' };
    return await this.userService.findAll(verificationStatus);
  }
  // @Get('getAll')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('filter-by-status/:status')
  async filterByStatus(@Query('status') status?: VerificationStatus) {
    console.log('12323343432432432432423432423432');
    return this.userService.getUsersByVerificationStatus(status);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}
