import {
  ICreatePostDTO,
  IFindManyDTO,
  IFindPostsByUserDTO,
  IUpdatePostDTO,
} from '@modules/posts/dtos';
import { Post } from '@modules/posts/entities/post.entity';
import { IPostsRepository } from '@modules/posts/repositories/posts-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { formatPagination } from '@shared/utils/format-pagination';
import { IPagination } from '@shared/utils/pagination';

@Injectable()
export class PostsRepository implements IPostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreatePostDTO): Promise<Post> {
    const post = await this.prisma.post.create({ data });

    return post;
  }

  async save({
    postId,
    title,
    description,
    mediaUrl,
  }: IUpdatePostDTO): Promise<Post> {
    const postUpdated = await this.prisma.post.update({
      where: { id: postId },
      data: {
        title,
        description,
        mediaUrl,
      },
    });

    return postUpdated;
  }

  async findMany({
    page,
    perPage,
    titleContains,
    descriptionContains,
  }: IFindManyDTO): Promise<IPagination<Post>> {
    const skip = (page - 1) * perPage;

    const [posts, count] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        skip,
        take: perPage,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: {
          title: { contains: titleContains, mode: 'insensitive' },
          description: { contains: descriptionContains, mode: 'insensitive' },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.post.count({
        where: {
          title: { contains: titleContains, mode: 'insensitive' },
          description: { contains: descriptionContains, mode: 'insensitive' },
        },
      }),
    ]);

    const postsPaginate = formatPagination({
      page,
      perPage,
      skip,
      count,
      data: posts,
    });

    return postsPaginate;
  }

  async findPostsByUserId({
    page,
    perPage,
    userIdEquals,
  }: IFindPostsByUserDTO): Promise<IPagination<Post>> {
    const skip = (page - 1) * perPage;

    const [posts, count] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where: {
          ownerId: userIdEquals,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.post.count({
        where: {
          ownerId: userIdEquals,
        },
      }),
    ]);

    const postsPaginate = formatPagination({
      page,
      perPage,
      skip,
      count,
      data: posts,
    });

    return postsPaginate;
  }

  async findById(postId: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    return post;
  }

  async delete(postId: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id: postId },
    });
  }
}
