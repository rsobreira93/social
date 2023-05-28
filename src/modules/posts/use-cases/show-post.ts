import { AppError } from '@shared/errors/app-errors';

import { Injectable } from '@nestjs/common';

import { Post } from '@modules/posts/entities/post.entity';
import { IPostsRepository } from '@modules/posts/repositories/posts-repository';

interface IRequest {
  postId: string;
}

interface IResponse {
  post: Post;
}

@Injectable()
export class ShowPost {
  constructor(private readonly postsRepository: IPostsRepository) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { postId } = data;

    const post = await this.postsRepository.findById(postId);

    if (!post) {
      throw new AppError('Post does not exists', 'POST_NOT_FOUND', 404);
    }

    return { post };
  }
}
