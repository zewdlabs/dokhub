import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserController } from './user.controller';
import { MinioService } from '../minio/minio.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MinioService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
