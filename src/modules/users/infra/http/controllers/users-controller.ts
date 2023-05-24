import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CreateUser } from '../../../use-cases/create-user';
import { CreateUserBody } from '../dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly createUser: CreateUser) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() createUserBody: CreateUserBody,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Res() response: Response,
  ) {
    const { name, email, password } = createUserBody;

    const { user } = await this.createUser.execute({
      name,
      email,
      password,
      avatarUrl: file ?? undefined,
    });

    return response.status(201).json(user);
  }
}
