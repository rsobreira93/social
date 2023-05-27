import { AppError } from '@shared/errors/app-errors';

import { Injectable } from '@nestjs/common';

import { User } from '@modules/users/entities/user.entity';
import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { differenceInYears } from 'date-fns';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  birthDate: string;
}

interface IResponse {
  user: User;
}

@Injectable()
export class UpdateUser {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { email, name, birthDate, userId } = data;

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError('User does not exists', 'USER_NOT_FOUND', 404);
    }

    if (email) {
      const emailAlreadyUsed = await this.usersRepository.findByEmail(email);

      if (emailAlreadyUsed && emailAlreadyUsed.id !== userExists.id) {
        throw new AppError('Email already used', 'EMAIL_ALREADY_USED', 409);
      }
    }

    const dateOfBirth = new Date(birthDate);

    if (this.calculateAge(dateOfBirth) < 14) {
      throw new AppError(
        'Age less than fourteen',
        'AGE_LESS_THAN_FOURTEEN',
        400,
      );
    }

    const user = await this.usersRepository.save({
      email,
      name,
      birthDate,
      userId,
    });

    return { user };
  }

  private calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    return differenceInYears(today, dateOfBirth);
  }
}
