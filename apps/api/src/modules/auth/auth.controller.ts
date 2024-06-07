import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { Post, Req, UseGuards } from '@nestjs/common';
// import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
// import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
// import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './auth.entity';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
// import CreateUserDto from '@/users/inputs/create-user-dto';
// import { Prisma } from '@prisma/client';
import CreateUserDto from './dto/create-user.dto';
import { RefreshJwtGuard } from './guards/refreshToken.guards';
// import { ResetPasswordDto } from './dto/reset-password.dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('hello')
  getHello(): { message: string } {
    return { message: 'Hello from Auth' };
  }
  @Post('signup')
  @ApiOkResponse({ type: AuthEntity })
  // @ApiBody({ type: Prisma.UserCreateInput })
  @ApiBody({ type: CreateUserDto })
  signup(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  // @UseGuards(LocalGuard)
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Get('status')
  @UseGuards(AccessTokenGuard)
  status(@Req() req: Request) {
    return req.user;
  }
  @Post('refresh')
  @UseGuards(RefreshJwtGuard)
  async refreshToken(@Req() req: Request) {
    return await this.authService.refreshToken(req.user);
  }

  @Get('verify-email')
  async verifyEmail(
    @Query('code') code: string,
    @Query('email') email: string,
  ) {
    const verification = await this.authService.verifyEmailCode(code, email);
    if (!verification) {
      throw new BadRequestException('Invalid verification code');
    }
    return { message: 'Email verified successfully' };
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() requestResetDto: { email: string }) {
    await this.authService.requestPasswordReset(requestResetDto);
  }
  @Post('reset-password')
  async resetPassword(
    @Body() data: { email: string; token: string; newPassword: string },
  ) {
    await this.authService.resetPassword(data);
  }
}
