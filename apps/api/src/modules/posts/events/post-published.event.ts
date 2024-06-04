import { Post, User } from '@prisma/client';

export class PostPublishedEvent {
  post: Post;
  author: User;
}
