import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserModule } from '@/modules/users/user.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { EmailService } from '../email/email.service';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    LocalStrategy,
    RefreshTokenStrategy,
    PrismaService,
    AccessTokenStrategy,
  ],
})
export class AuthModule {}
