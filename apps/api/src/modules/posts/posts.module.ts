import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserModule } from '@/modules/users/user.module';
import { PostPublishedListener } from './listeners/post-published.listener';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [PostsController],
  providers: [PostsService, PostPublishedListener],
})
export class PostsModule {}
