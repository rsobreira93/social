import { AppError } from '@shared/errors/app-errors';

import { Injectable } from '@nestjs/common';

import { S3Service } from '@shared/s3/s3.service';
import { Post } from '../entities/post.entity';
import { IPostsRepository } from '../repositories/posts-repository';

interface IRequest {
  postId: string;
  title: string;
  description: string;
  mediaUrl?: Express.Multer.File | undefined;
}

interface IResponse {
  post: Post;
}

@Injectable()
export class UpdatePost {
  constructor(
    private readonly postsRepository: IPostsRepository,
    private readonly s3Provider: S3Service,
  ) {}

  public async execute({
    postId,
    title,
    description,
    mediaUrl,
  }: IRequest): Promise<IResponse> {
    const postExists = await this.postsRepository.findById(postId);

    if (!postExists) {
      throw new AppError('Post does not exists', 'POST_NOT_FOUND', 404);
    }

    let s3: string;

    if (mediaUrl !== undefined) {
      s3 = await this.s3Provider.uploadFile(mediaUrl, 'posts');
    }

    const post = await this.postsRepository.save({
      postId,
      title,
      description,
      mediaUrl: s3 ?? undefined,
    });

    return { post };
  }
}
