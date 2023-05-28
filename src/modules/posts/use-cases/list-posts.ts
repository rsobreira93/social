import { IPagination } from '@shared/utils/pagination';

import { Injectable } from '@nestjs/common';

import { Post } from '../entities/post.entity';
import { IPostsRepository } from '../repositories/posts-repository';

interface IRequest {
  titleContains?: string;
  descriptionContains?: string;
  page: string;
  perPage: string;
}

interface IResponse {
  postsPaginated: IPagination<Post>;
}

@Injectable()
export class ListPosts {
  constructor(private readonly postsRepository: IPostsRepository) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { titleContains, descriptionContains, page, perPage } = data;

    const postsPaginated = await this.postsRepository.findMany({
      titleContains,
      descriptionContains,
      page: Number(page),
      perPage: Number(perPage),
    });

    return { postsPaginated };
  }
}
