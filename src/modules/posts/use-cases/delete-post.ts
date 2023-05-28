import { AppError } from '@shared/errors/app-errors';

import { Injectable } from '@nestjs/common';

import { IPostsRepository } from '../repositories/posts-repository';

interface IRequest {
  postId: string;
}

@Injectable()
export class DeletePost {
  constructor(private readonly postsRepository: IPostsRepository) {}

  public async execute(data: IRequest): Promise<void> {
    const { postId } = data;

    const user = await this.postsRepository.findById(postId);

    if (!user) {
      throw new AppError('User does not exists', 'USER_NOT_FOUND', 404);
    }

    await this.postsRepository.delete(postId);
  }
}
