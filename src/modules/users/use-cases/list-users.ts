import { IPagination } from '@shared/utils/pagination';

import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/users-repository';

interface IRequest {
  nameContains?: string;
  emailContains?: string;
  page: string;
  perPage: string;
}

interface IResponse {
  usersPaginated: IPagination<User>;
}

@Injectable()
export class ListUsers {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { emailContains, nameContains, page, perPage } = data;

    const usersPaginated = await this.usersRepository.findMany({
      emailContains,
      nameContains,
      page: Number(page),
      perPage: Number(perPage),
    });

    return { usersPaginated };
  }
}
