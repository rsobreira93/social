import { User } from '@modules/users/entities/user.entity';
import { IUsersRepository } from '@modules/users/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { AppError } from '@shared/errors/app-errors';
import { LoggerService } from '@shared/loggers/logger.service';
import { S3Service } from '@shared/s3/s3.service';
import { hash } from 'bcryptjs';
import { differenceInYears } from 'date-fns';

interface IRequest {
  name: string;
  email: string;
  password: string;
  birthDate: string;
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
    birthDate,
    avatarUrl,
  }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists', 'USER_ALREADY_EXISTS', 409);
    }
    // this.loggerService.info(`Called method: ${this.s3Provider.uploadFile}()`);

    const dateOfBirth = new Date(birthDate);

    if (this.calculateAge(dateOfBirth) < 14) {
      throw new AppError(
        'Age less than fourteen',
        'AGE_LESS_THAN_FOURTEEN',
        400,
      );
    }

    let s3: string;

    if (avatarUrl !== undefined) {
      s3 = await this.s3Provider.uploadFile(avatarUrl, 'users');
    }

    const passwordHashed = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
      birthDate,
      avatarUrl: s3 ?? undefined,
    });

    return { user };
  }

  private calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    return differenceInYears(today, dateOfBirth);
  }
}
