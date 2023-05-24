import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { AppError } from 'src/shared/errors/app-errors';
import { LoggerService } from 'src/shared/loggers/logger.service';
import { S3Service } from '../../../shared/s3/s3.service';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../repositories/users-repository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatarUrl?: Express.Multer.File | undefined;
}

interface IResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly loggerService: LoggerService,
    private readonly s3Provider: S3Service,
  ) {
    this.loggerService.contextName = CreateUser.name;
  }

  public async execute({
    name,
    email,
    password,
    avatarUrl,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists', 'USER_ALREADY_EXISTS', 409);
    }
    // this.loggerService.info(`Called method: ${this.s3Provider.uploadFile}()`);

    let s3: string;

    if (avatarUrl !== undefined) {
      s3 = await this.s3Provider.uploadFile(avatarUrl, 'users');
    }

    const passwordHashed = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
      avatarUrl: s3 ?? undefined,
    });

    return { user };
  }
}
