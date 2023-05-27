import {
  IFindManyDTO,
  IUpdateUserAvatarDTO,
  IUpdateUserDTO,
  IUpdateUserPasswordDTO,
} from '@modules/users/dtos';
import { ICreateUserDTO } from '@modules/users/dtos/create-user';
import { User } from '@modules/users/entities/user.entity';
import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { formatPagination } from '@shared/utils/format-pagination';
import { IPagination } from '@shared/utils/pagination';

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

  async save({
    userId,
    email,
    name,
    birthDate,
  }: IUpdateUserDTO): Promise<User> {
    const userUpdated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        birthDate,
      },
    });

    return userUpdated;
  }

  async savePassword({
    userId,
    password,
  }: IUpdateUserPasswordDTO): Promise<User> {
    const userUpdatedPassword = await this.prisma.user.update({
      where: { id: userId },
      data: { password },
    });

    return userUpdatedPassword;
  }

  public async saveAvatarUrl({
    userId,
    avatarUrl,
  }: IUpdateUserAvatarDTO): Promise<User> {
    const userUpdatedAvatarUrl = await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    return userUpdatedAvatarUrl;
  }

  public async findMany(options: IFindManyDTO): Promise<IPagination<User>> {
    const { emailContains, nameContains, page, perPage } = options;

    const skip = (page - 1) * perPage;

    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: perPage,
        where: {
          email: { contains: emailContains, mode: 'insensitive' },
          name: { contains: nameContains, mode: 'insensitive' },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({
        where: {
          email: { contains: emailContains, mode: 'insensitive' },
          name: { contains: nameContains, mode: 'insensitive' },
        },
      }),
    ]);

    const usersPaginate = formatPagination({
      page,
      perPage,
      skip,
      count,
      data: users,
    });

    return usersPaginate;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });

    return user;
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
