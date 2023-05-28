import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { AppError } from '@shared/errors/app-errors';
import { S3Service } from '@shared/s3/s3.service';
import { Post } from '../entities/post.entity';
import { IPostsRepository } from '../repositories/posts-repository';

interface IRequest {
  title: string;
  description: string;
  ownerId: string;
  mediaUrl?: Express.Multer.File | undefined;
}

interface IResponse {
  post: Post;
}

@Injectable()
export class CreatePost {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly postsRepository: IPostsRepository,
    private readonly s3Provider: S3Service,
  ) {}

  public async execute({
    title,
    description,
    ownerId,
    mediaUrl,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findById(ownerId);

    if (!userExists) {
      throw new AppError('User does not exists', 'USER_DOES_NOT_EXISTS', 404);
    }

    let s3: string;

    if (mediaUrl !== undefined) {
      s3 = await this.s3Provider.uploadFile(mediaUrl, 'posts');
    }

    const post = await this.postsRepository.create({
      title,
      description,
      ownerId,
      mediaUrl: s3 ?? undefined,
    });

    return { post };
  }
}
