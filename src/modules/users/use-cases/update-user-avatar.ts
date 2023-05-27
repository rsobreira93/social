import { AppError } from '@shared/errors/app-errors';

import { Injectable } from '@nestjs/common';

import { S3Service } from '@shared/s3/s3.service';
import { IUsersRepository } from '../repositories/users-repository';

interface IRequest {
  userId: string;
  avatarUrl: Express.Multer.File | undefined;
}

@Injectable()
export class UpdateUserAvatar {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly s3Provider: S3Service,
  ) {}

  public async execute(data: IRequest): Promise<void> {
    const { userId, avatarUrl } = data;

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new AppError('User does not exists', 'USER_NOT_FOUND', 404);
    }

    let s3: string;

    if (avatarUrl !== undefined) {
      s3 = await this.s3Provider.uploadFile(avatarUrl, 'users');
    }

    await this.usersRepository.saveAvatarUrl({
      userId: userExists.id,
      avatarUrl: s3 ?? undefined,
    });
  }
}
