import { IPagination } from '@shared/utils/pagination';
import {
  ICreateUserDTO,
  IFindManyDTO,
  IUpdateUserAvatarDTO,
  IUpdateUserDTO,
  IUpdateUserPasswordDTO,
} from '../dtos';
import { User } from '../entities/user.entity';

export abstract class IUsersRepository {
  abstract create(data: ICreateUserDTO): Promise<User>;
  abstract save(updateUserDTO: IUpdateUserDTO): Promise<User>;
  abstract savePassword(
    updateUserPasswordDTO: IUpdateUserPasswordDTO,
  ): Promise<User>;
  abstract saveAvatarUrl(
    updateUserAvatarDTO: IUpdateUserAvatarDTO,
  ): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findMany(options: IFindManyDTO): Promise<IPagination<User>>;
  abstract findById(userId: string): Promise<User | null>;
  abstract delete(userId: string): Promise<void>;
}
