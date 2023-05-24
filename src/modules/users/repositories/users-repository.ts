import { ICreateUserDTO } from '../dtos/create-user';
import { User } from '../entities/user.entity';

export abstract class IUsersRepository {
  abstract create(data: ICreateUserDTO): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
}
