import { User } from '@modules/users/entities/user.entity';
import { Post } from '@prisma/client';

export interface IUserViewModelResponse {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  avatarUrl: string;
}

export class UserViewModel {
  static ToHTTP(user: Partial<User>): IUserViewModelResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      avatarUrl: user.avatarUrl,
    };
  }
}
