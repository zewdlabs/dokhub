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

  @Get('library/:userId')
  findUserLibrary(@Param('userId') userId: string) {
    return this.postsService.findUserLibrary(userId);
  }

  @Delete(':postId/removefromlibrary/:userId')
  removeFromLibrary(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.postsService.removeFromLibrary(userId, postId);
  }

  @Post(':postId/addtolibrary/:userId')
  addToUserLibrary(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.postsService.addToUsersLibrary(userId, postId);
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
  findUserFollowingPosts(@Param('userId') userId: string) {
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

  @Post(':postId/reply')
  async replyPost(
    @Param('postId') postId: string,
    @Body() replyPostDto: CreatePostDto,
  ) {
    return this.postsService.replyToPost(postId, replyPostDto);
  }

  @Get(':postId/reply')
  async getReplies(@Param('postId') postId: string) {
    return this.postsService.getReplies(postId);
  }
}
