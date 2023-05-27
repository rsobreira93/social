import { BaseEntity } from '@shared/utils/base.entity';

export class User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  avatarUrl?: string;
}
