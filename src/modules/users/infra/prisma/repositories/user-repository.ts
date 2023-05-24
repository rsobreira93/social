import { Injectable } from '@nestjs/common';
import { ICreateUserDTO } from 'src/modules/users/dtos/create-user';
import { User } from 'src/modules/users/entities/user.entity';
import { IUsersRepository } from 'src/modules/users/repositories/users-repository';
import { PrismaService } from '../../../../../shared/database/prisma/prisma.service';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    return user;
  }
}
