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
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
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
// import { VerificationGuard } from '../auth/guards/post.guard';
// import { Verification } from '../auth/decorators/verificationstatus.decorate';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private minioService: MinioService,
  ) {}

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
    // console.log('12323343432432432432423432423432');
    return this.userService.getUsersByVerificationStatus(status);
  }

  @Patch('validate/:id')
  @Roles(Role.SUADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth()
  async validateUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.validateUser(id);
  }
  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }

  @Post('upload-profile-picture')
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
  ): Promise<{ url: string }> {
    const fileName = await this.minioService.uploadFile(file);
    const fileUrl = await this.minioService.getFileUrl(fileName);
    console.log('================================', fileUrl);
    return { url: fileUrl };
  }
}
