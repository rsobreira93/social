import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/infra/prisma/repositories/user-repository';
import { IUsersRepository } from 'src/modules/users/repositories/users-repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [IUsersRepository],
})
export class PrismaModule {}
