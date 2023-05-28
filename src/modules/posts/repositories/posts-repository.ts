import { IPagination } from '@shared/utils/pagination';
import {
  ICreatePostDTO,
  IFindManyDTO,
  IFindPostsByUserDTO,
  IUpdatePostDTO,
} from '../dtos';
import { Post } from '../entities/post.entity';

export abstract class IPostsRepository {
  abstract create(data: ICreatePostDTO): Promise<Post>;
  abstract save(updateUserDTO: IUpdatePostDTO): Promise<Post>;
  abstract findMany(options: IFindManyDTO): Promise<IPagination<Post>>;
  abstract findById(postId: string): Promise<Post | null>;
  abstract findPostsByUserId(
    options: IFindPostsByUserDTO,
  ): Promise<IPagination<Post>>;
  abstract delete(postId: string): Promise<void>;
}
