import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('hello')
  getHello(): { message: string } {
    return { message: 'Hello from AuthController' };
  }
}
