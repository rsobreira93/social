import { IPagination } from '@shared/utils/pagination';

import { Injectable } from '@nestjs/common';

import { Post } from '../entities/post.entity';
import { IPostsRepository } from '../repositories/posts-repository';

interface IRequest {
  userIdEquals: string;
  page: string;
  perPage: string;
}

interface IResponse {
  postsPaginated: IPagination<Post>;
}

@Injectable()
export class ListPostsByUser {
  constructor(private readonly postsRepository: IPostsRepository) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { userIdEquals, page, perPage } = data;

    const postsPaginated = await this.postsRepository.findPostsByUserId({
      userIdEquals,
      page: Number(page),
      perPage: Number(perPage),
    });

    return { postsPaginated };
  }
}
