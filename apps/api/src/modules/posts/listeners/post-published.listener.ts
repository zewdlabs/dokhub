import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PostPublishedEvent } from '../events/post-published.event';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class PostPublishedListener {
  constructor(private prisma: PrismaService) {}

  @OnEvent('post.published', { async: true, promisify: true })
  async handleOrderCreatedEvent(event: PostPublishedEvent) {
    const following = await this.prisma.follows.findMany({
      where: { followingId: event.author.id },
    });

    await this.prisma.forYou.createMany({
      data: following.map((f) => ({
        userId: f.followedById,
        postId: event.post.id,
      })),
      skipDuplicates: true,
    });
  }
}
