import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('drafts/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  findUserDrafts(@Param('userId') userId: string) {
    return this.postsService.findUserDrafts(userId);
  }

  @Get('library/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  findUserLibrary(@Param('userId') userId: string) {
    return this.postsService.findUserLibrary(userId);
  }

  @Delete(':postId/removefromlibrary/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  removeFromLibrary(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.postsService.removeFromLibrary(userId, postId);
  }

  @Post(':postId/addtolibrary/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  addToUserLibrary(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return this.postsService.addToUsersLibrary(userId, postId);
  }

  @Get('published/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  findUserPublishedPosts(@Param('userId') userId: string) {
    return this.postsService.findUserPublishedPosts(userId);
  }

  @Get('foryou/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  findUserForyouPosts(@Param('userId') userId: string) {
    return this.postsService.findUserForyouPosts(userId);
  }

  @Get('following/:userId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  findUserFollowingPosts(@Param('userId') userId: string) {
    return this.postsService.findUserFollowingPosts(userId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Get('search/:name')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async searchPosts(@Param('name') name: string) {
    return this.postsService.searchPostsByName(name);
  }

  @Post(':postId/like')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async likePost(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    return this.postsService.likePost(postId, userId);
  }

  @Post(':postId/reply')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async replyPost(
    @Param('postId') postId: string,
    @Body() replyPostDto: CreatePostDto,
  ) {
    return this.postsService.replyToPost(postId, replyPostDto);
  }

  @Get(':postId/reply')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async getReplies(@Param('postId') postId: string) {
    return this.postsService.getReplies(postId);
  }
}
