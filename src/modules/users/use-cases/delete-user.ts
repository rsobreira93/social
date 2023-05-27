import { AppError } from '@shared/errors/app-errors';

import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../repositories/users-repository';

interface IRequest {
  userId: string;
}

@Injectable()
export class DeleteUser {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(data: IRequest): Promise<void> {
    const { userId } = data;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists', 'USER_NOT_FOUND', 404);
    }

    await this.usersRepository.delete(userId);
  }
}
