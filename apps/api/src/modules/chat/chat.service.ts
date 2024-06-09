import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageRole } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
// import { ChatCreatedEvent } from './events/chat-created.event';

@Injectable()
export class ChatService {
  constructor(
    private prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async updateChat(id: string, title: string) {
    return await this.prismaService.chat.update({
      where: {
        id: id,
      },
      data: {
        title,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.chat.delete({
      where: {
        id,
      },

      include: {
        Message: true,
      },
    });
  }

  async createChat(id: string) {
    await this.prismaService.chat.deleteMany({
      where: {
        userId: id,
        Message: {
          none: {},
        },
      },
    });

    return await this.prismaService.chat.create({
      data: {
        user: {
          connect: {
            id: id,
          },
        },
      },
    });
  }

  async findAll(id: string) {
    return await this.prismaService.chat.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, chatId: string) {
    return await this.prismaService.chat.findFirst({
      where: {
        userId: id,
        id: chatId,
      },
    });
  }

  async getAllChatMessages(id: string, chatId: string) {
    return await this.prismaService.message.findMany({
      where: {
        chatId: chatId,
      },
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true,
      },
    });
  }

  async createMessage(
    id: string,
    chatId: string,
    body: { content: string; role: MessageRole },
  ) {
    await this.prismaService.message.create({
      data: {
        role: body.role,
        content: body.content,
        chat: {
          connectOrCreate: {
            create: {
              user: {
                connect: {
                  id: id,
                },
              },
            },
            where: {
              id: chatId,
            },
          },
        },
      },
    });
  }
}
