import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
