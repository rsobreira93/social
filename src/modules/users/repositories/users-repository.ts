import { IPagination } from 'src/shared/utils/pagination';
import { User } from '../entities/user.entity';
import {
  ICreateUserDTO,
  IFindManyDTO,
  IUpdateUserDTO,
  IUpdateUserPasswordDTO,
} from '../dtos';

export abstract class IUsersRepository {
  abstract create(data: ICreateUserDTO): Promise<User>;
  abstract save(updateUserDTO: IUpdateUserDTO): Promise<User>;
  abstract savePassword(
    updateUserPasswordDTO: IUpdateUserPasswordDTO,
  ): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findMany(options: IFindManyDTO): Promise<IPagination<User>>;
  abstract findById(userId: string): Promise<User | null>;
  abstract delete(userId: string): Promise<void>;
}
