import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { MessageRole } from '@prisma/client';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/user/:id')
  findAll(@Param('id') id: string) {
    return this.chatService.findAll(id);
  }

  @Post('/user/:id')
  createChat(@Param('id') id: string) {
    return this.chatService.createChat(id);
  }

  @Post('/user/:id/:chatId')
  createMessage(
    @Param('id') id: string,
    @Param('chatId') chatId: string,
    @Body() body: { content: string; role: MessageRole },
  ) {
    return this.chatService.createMessage(id, chatId, body);
  }

  @Get('/user/:id/:chatId')
  getAllChatMessages(@Param('id') id: string, @Param('chatId') chatId: string) {
    return this.chatService.getAllChatMessages(id, chatId);
  }

  @Patch('/user/:id/:chatId')
  updateChat(
    @Param('id') id: string,
    @Param('chatId') chatId: string,
    @Body() body: { title: string },
  ) {
    return this.chatService.updateChat(chatId, body.title);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }
}
