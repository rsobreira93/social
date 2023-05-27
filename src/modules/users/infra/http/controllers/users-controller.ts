import {
  CreateUser,
  DeleteUser,
  ListUsers,
  ShowUser,
  UpdateUser,
  UpdateUserPassword,
} from '@modules/users/use-cases';
import { UpdateUserAvatar } from '@modules/users/use-cases/update-user-avatar';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  CreateUserBody,
  ListUsersQuery,
  UpdateUserBody,
  UpdateUserPasswordBody,
} from '../dtos';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly showUser: ShowUser,
    private readonly listUsers: ListUsers,
    private readonly updateUserPassword: UpdateUserPassword,
    private readonly updateUserAvatar: UpdateUserAvatar,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() createUserBody: CreateUserBody,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Res() response: Response,
  ) {
    const { name, email, password, birthDate } = createUserBody;

    const { user } = await this.createUser.execute({
      name,
      email,
      password,
      birthDate,
      avatarUrl: file ?? undefined,
    });

    return response.status(201).json(user);
  }

  @Get('/')
  public async list(
    @Query() listUsersQuery: ListUsersQuery,
    @Res() response: Response,
  ) {
    const { emailContains, nameContains, page, perPage } = listUsersQuery;

    const { usersPaginated } = await this.listUsers.execute({
      emailContains,
      nameContains,
      page,
      perPage,
    });

    usersPaginated.data = usersPaginated.data.map(UserViewModel.ToHTTP);

    return response.status(200).json(usersPaginated);
  }

  @Put('/:userId')
  public async update(
    @Body() updateUserBody: UpdateUserBody,
    @Param('userId') userId: string,
    @Res() response: Response,
  ) {
    const { email, name, birthDate } = updateUserBody;

    const { user } = await this.updateUser.execute({
      email,
      name,
      birthDate,
      userId,
    });

    const userViewModel = UserViewModel.ToHTTP(user);

    return response.status(200).json(userViewModel);
  }

  @Patch('/password/:userId')
  public async updatePassword(
    @Body() updateUserPasswordBody: UpdateUserPasswordBody,
    @Param('userId') userId: string,
    @Res() response: Response,
  ) {
    const { password, oldPassword } = updateUserPasswordBody;

    await this.updateUserPassword.execute({
      password,
      userId,
      oldPassword,
    });

    return response.status(204).json();
  }

  @Patch('/avatar/:userId')
  @UseInterceptors(FileInterceptor('file'))
  public async updateAvatar(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Param('userId') userId: string,
    @Res() response: Response,
  ) {
    await this.updateUserAvatar.execute({
      userId,
      avatarUrl: file ?? undefined,
    });

    return response.status(204).json();
  }

  @Get('/:userId')
  public async show(
    @Param('userId') userId: string,
    @Res() response: Response,
  ) {
    const { user } = await this.showUser.execute({
      userId,
    });

    const userViewModel = UserViewModel.ToHTTP(user);

    return response.status(200).json(userViewModel);
  }

  @Delete('/:userId')
  public async delete(
    @Param('userId') userId: string,
    @Res() response: Response,
  ) {
    await this.deleteUser.execute({
      userId,
    });

    return response.status(204).json();
  }
}
