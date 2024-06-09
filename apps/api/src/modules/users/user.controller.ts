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
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role, User as UserModel, VerificationStatus } from '@prisma/client';
// import CreatePlatformUserInput from './inputs/create-user-dto';
import { ApiBearerAuth, ApiResponse, PartialType } from '@nestjs/swagger';
// import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { AccessTokenGuard } from '@/modules/auth/guards/accessToken.guard';
import { Roles } from '@/modules/auth/decorators/role.decorate';
import { RoleGuard } from '@/modules/auth/guards/role.guard';
import CreateUserDto from '@/modules/auth/dto/create-user.dto';
import { MinioService } from '../minio/minio.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserDto } from '../auth/dto/user.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
// import { VerificationGuard } from '../auth/guards/post.guard';
// import { Verification } from '../auth/decorators/verificationstatus.decorate';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private minioService: MinioService,
  ) {}

  @Get('allusers')
  @Roles(Role.ADMIN, Role.SUADMIN)
  // @Verification(VerificationStatus.INCOMPLETE)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('verified')
  @Roles(Role.ADMIN, Role.SUADMIN)
  // @Verification(VerificationStatus.INCOMPLETE)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth()
  async getAllVerifiedUsers() {
    return this.userService.getAllVerifiedUsers();
  }

  @Get('pending')
  @Roles(Role.ADMIN, Role.SUADMIN)
  // @Verification(VerificationStatus.INCOMPLETE)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth()
  async getAllVerifications() {
    return this.userService.getAllVerifications();
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async getUser(@Param('id') id: string) {
    return this.userService.user({ id: id });
  }

  // @Get('profile/:id')
  // @UseGuards(AccessTokenGuard)
  // @ApiBearerAuth()
  // async getUserForProfile(@Param('id') id: string) {
  //   return this.userService.getUserForProfile(id);
  // }

  @Post()
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UserDto,
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
    @Param('verificationStatus') verificationStatus?: VerificationStatus | null,
  ): Promise<any> {
    console.log(verificationStatus);
    return { message: 'hello' };
    // return await this.userService.findAll(verificationStatus);
  }
  // @Get('getAll')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Get('filter-by-status/:status')
  async filterByStatus(@Query('status') status?: VerificationStatus) {
    return this.userService.getUsersByVerificationStatus(status);
  }

  @Patch('validate/:id/:verificationStatus')
  @Roles(Role.SUADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth()
  // @ApiBody({ type: { status: VerificationStatus } })
  async validateUser(
    @Param('id') id: string,
    @Param('verificationStatus') verificationStatus: VerificationStatus,
  ): Promise<UserModel> {
    console.log(id, verificationStatus);
    return this.userService.validateUser(id, verificationStatus);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }

  @Post('upload-profile-picture/:id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload profile picture' })
  @ApiResponse({ status: 201, description: 'The URL of the uploaded file.' })
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<{ url: string }> {
    console.log('000000000000000000000000000000000000000', id);
    const fileName = await this.minioService.uploadFile(file);
    const fileUrl = await this.minioService.getFileUrl(fileName);
    await this.userService.updateProfilePath(id, fileUrl);
    return { url: fileUrl };
  }

  @Post('follow')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth()
  async followUser(
    @Body() followData: { userId: string; userToFollowId: string },
  ): Promise<void> {
    const { userId, userToFollowId } = followData;
    await this.userService.updateUserFollowing(userId, userToFollowId);
  }

  @Patch('profile/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiBody({ type: PartialType<UpdateUserDto> })
  async updateProfile(
    @Param('userId') userId: string,
    @Body() partialUpdateUserDto: Partial<UpdateUserDto>,
  ) {
    console.log('For updating user', partialUpdateUserDto);
    console.log('userId', userId);

    try {
      const updatedUser = await this.userService.updateProfile(
        userId,
        partialUpdateUserDto,
      );
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', partialUpdateUserDto);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('search/:name')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async searchUsers(@Param('name') name: string) {
    try {
      return await this.userService.searchUsersByName(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          'No users found with the given name or email',
        );
      }
      throw error;
    }
  }
  @Delete(':userId/unfollow')
  async unfollowUser(
    @Param('userId') userId: string,
    @Body('userToUnfollowId') userToUnfollowId: string,
  ) {
    try {
      await this.userService.unfollowUser(userId, userToUnfollowId);
      return { message: 'User unfollowed successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
