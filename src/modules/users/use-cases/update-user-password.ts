import { compare, hash } from 'bcryptjs';

import { AppError } from '@shared/errors/app-errors';

import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../repositories/users-repository';

interface IRequest {
  userId: string;
  password: string;
  oldPassword: string;
}

@Injectable()
export class UpdateUserPassword {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(data: IRequest): Promise<void> {
    const { userId, password, oldPassword } = data;

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError('User does not exists', 'USER_NOT_FOUND', 404);
    }

    const oldPasswordMatch = await compare(oldPassword, userExists.password);

    if (!oldPasswordMatch) {
      throw new AppError(
        'Old password does not match',
        'OLD_PASSWORD_MISMATCH',
        404,
      );
    }

    const passwordHashed = await hash(password, 10);

    await this.usersRepository.savePassword({
      userId: userExists.id,
      password: passwordHashed,
    });
  }
}
