import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class UserModule {}
