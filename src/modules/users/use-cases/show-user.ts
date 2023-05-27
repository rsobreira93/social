import { AppError } from '@shared/errors/app-errors';

import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/users-repository';

interface IRequest {
  userId: string;
}

interface IResponse {
  user: User;
}

@Injectable()
export class ShowUser {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { userId } = data;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists', 'USER_NOT_FOUND', 404);
    }

    return { user };
  }
}
