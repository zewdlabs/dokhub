import { Body, Controller, Get } from '@nestjs/common';

import { Post, Req, UseGuards } from '@nestjs/common';
// import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
// import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
// import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './auth.entity';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';
// import CreateUserDto from '@/users/inputs/create-user-dto';
import { Prisma } from '@prisma/client';
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
  signup(@Body() user: Prisma.UserCreateInput) {
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
    console.log('Inside AuthController status method');
    console.log(req.user);
    return req.user;
  }
}
