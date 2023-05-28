import { PostsRepository } from '@modules/posts/infra/prisma/repositories/pots-repository';
import { IPostsRepository } from '@modules/posts/repositories/posts-repository';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/user-repository';
import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    {
      provide: IPostsRepository,
      useClass: PostsRepository,
    },
  ],
  exports: [IUsersRepository, IPostsRepository],
})
export class PrismaModule {}
