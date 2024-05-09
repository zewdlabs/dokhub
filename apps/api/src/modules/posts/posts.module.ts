import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserModule } from '@/modules/users/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
