import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageRole, Role } from '@prisma/client';

describe('ChatService', () => {
  let chatService: ChatService;
  let prismaService: PrismaService;

  const prismaMock = {
    chat: {
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    message: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });

  describe('updateChat', () => {
    it('should update a chat title', async () => {
      const chatId = 'chat1';
      const title = 'Updated Title';
      const updatedChat = { id: chatId, title };

      prismaMock.chat.update.mockResolvedValue(updatedChat);

      const result = await chatService.updateChat(chatId, title);
      expect(result).toEqual(updatedChat);
      expect(prismaMock.chat.update).toHaveBeenCalledWith({
        where: { id: chatId },
        data: { title },
      });
    });
  });

  describe('remove', () => {
    it('should delete a chat', async () => {
      const chatId = 'chat1';
      const deletedChat = { id: chatId, Message: [] };

      prismaMock.chat.delete.mockResolvedValue(deletedChat);

      const result = await chatService.remove(chatId);
      expect(result).toEqual(deletedChat);
      expect(prismaMock.chat.delete).toHaveBeenCalledWith({
        where: { id: chatId },
        include: { Message: true },
      });
    });
  });

  describe('createChat', () => {
    it('should delete empty chats and create a new chat', async () => {
      const userId = 'user1';
      const newChat = { id: 'chat2', userId };

      prismaMock.chat.deleteMany.mockResolvedValue({ count: 1 });
      prismaMock.chat.create.mockResolvedValue(newChat);

      const result = await chatService.createChat(userId);
      expect(result).toEqual(newChat);
      expect(prismaMock.chat.deleteMany).toHaveBeenCalledWith({
        where: {
          userId,
          Message: { none: {} },
        },
      });
      expect(prismaMock.chat.create).toHaveBeenCalledWith({
        data: {
          user: {
            connect: { id: userId },
          },
        },
      });
    });
  });

  describe('findAll', () => {
    it('should find all chats for a user', async () => {
      const userId = 'user1';
      const chats = [
        { id: 'chat1', userId },
        { id: 'chat2', userId },
      ];

      prismaMock.chat.findMany.mockResolvedValue(chats);

      const result = await chatService.findAll(userId);
      expect(result).toEqual(chats);
      expect(prismaMock.chat.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should find one chat for a user', async () => {
      const userId = 'user1';
      const chatId = 'chat1';
      const chat = { id: chatId, userId };

      prismaMock.chat.findFirst.mockResolvedValue(chat);

      const result = await chatService.findOne(userId, chatId);
      expect(result).toEqual(chat);
      expect(prismaMock.chat.findFirst).toHaveBeenCalledWith({
        where: { userId, id: chatId },
      });
    });
  });

  describe('getAllChatMessages', () => {
    it('should get all messages for a chat', async () => {
      const chatId = 'chat1';
      const messages = [
        {
          id: 'msg1',
          role: MessageRole.user,
          content: 'Hello',
          createdAt: new Date(),
        },
        {
          id: 'msg2',
          role: MessageRole.assistant,
          content: 'Hi',
          createdAt: new Date(),
        },
      ];

      prismaMock.message.findMany.mockResolvedValue(messages);

      const result = await chatService.getAllChatMessages('user1', chatId);
      expect(result).toEqual(messages);
      expect(prismaMock.message.findMany).toHaveBeenCalledWith({
        where: { chatId },
        select: { id: true, role: true, content: true, createdAt: true },
      });
    });
  });

  describe('createMessage', () => {
    it('should create a new message in a chat', async () => {
      const userId = 'user1';
      const chatId = 'chat1';
      const messageData = { content: 'Hello', role: MessageRole.user };
      const newMessage = {
        id: 'msg1',
        ...messageData,
        chatId,
        createdAt: new Date(),
      };

      prismaMock.message.create.mockResolvedValue(newMessage);

      await chatService.createMessage(userId, chatId, messageData);
      expect(prismaMock.message.create).toHaveBeenCalledWith({
        data: {
          role: messageData.role,
          content: messageData.content,
          chat: {
            connectOrCreate: {
              where: { id: chatId },
              create: {
                user: { connect: { id: userId } },
              },
            },
          },
        },
      });
    });
  });
});
