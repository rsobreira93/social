import {
  CreatePost,
  DeletePost,
  ListPosts,
  ListPostsByUser,
  UpdatePost,
} from '@modules/posts/use-cases';
import { ShowPost } from '@modules/posts/use-cases/show-post';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  CreatePostBody,
  ListPostsByUserQuery,
  ListPostsQuery,
  UpdatePostBody,
} from '../dtos';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly createPost: CreatePost,
    private readonly listPosts: ListPosts,
    private readonly listPostsByUser: ListPostsByUser,
    private readonly updatePost: UpdatePost,
    private readonly showPost: ShowPost,
    private readonly deletePost: DeletePost,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() createPostBody: CreatePostBody,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Res() response: Response,
  ) {
    const { title, description, ownerId } = createPostBody;

    const { post } = await this.createPost.execute({
      title,
      description,
      ownerId,
      mediaUrl: file ?? undefined,
    });

    return response.status(201).json(post);
  }

  @Get('/')
  public async list(
    @Query() listPostsQuery: ListPostsQuery,
    @Res() response: Response,
  ) {
    const { titleContains, descriptionContains, page, perPage } =
      listPostsQuery;

    const { postsPaginated } = await this.listPosts.execute({
      titleContains,
      descriptionContains,
      page,
      perPage,
    });

    return response.status(200).json(postsPaginated);
  }

  @Get('/my-posts/:userId')
  public async listPostsByUserId(
    @Query() listPostsByUserQuery: ListPostsByUserQuery,
    @Param('userId') userId: string,
    @Res() response: Response,
  ) {
    const { page, perPage } = listPostsByUserQuery;

    const { postsPaginated } = await this.listPostsByUser.execute({
      userIdEquals: userId,
      page,
      perPage,
    });

    return response.status(200).json(postsPaginated);
  }

  @Put('/:postId')
  @UseInterceptors(FileInterceptor('file'))
  public async update(
    @Body() updatePostBody: UpdatePostBody,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Param('postId') postId: string,
    @Res() response: Response,
  ) {
    const { title, description } = updatePostBody;

    const { post } = await this.updatePost.execute({
      title,
      description,
      mediaUrl: file ?? undefined,
      postId,
    });

    return response.status(200).json(post);
  }

  @Get('/:postId')
  public async show(
    @Param('postId') postId: string,
    @Res() response: Response,
  ) {
    const { post } = await this.showPost.execute({
      postId,
    });

    return response.status(200).json(post);
  }

  @Delete('/:postId')
  public async delete(
    @Param('postId') postId: string,
    @Res() response: Response,
  ) {
    await this.deletePost.execute({
      postId,
    });

    return response.status(204).json();
  }
}
