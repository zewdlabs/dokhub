import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('drafts/:userId')
  findUserDrafts(@Param('userId') userId: string) {
    return this.postsService.findUserDrafts(userId);
  }

  @Get('published/:userId')
  findUserPublishedPosts(@Param('userId') userId: string) {
    return this.postsService.findUserPublishedPosts(userId);
  }

  @Get('foryou/:userId')
  findUserForyouPosts(@Param('userId') userId: string) {
    return this.postsService.findUserForyouPosts(userId);
  }

  @Get('following/:userId')
  findUserFollowingPosts(userId: string) {
    return this.postsService.findUserFollowingPosts(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Get('search/:name')
  async searchPosts(@Param('name') name: string) {
    return this.postsService.searchPostsByName(name);
  }

  @Post(':postId/like')
  async likePost(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    return this.postsService.likePost(postId, userId);
  }
}
