import { BaseEntity } from 'src/shared/utils/base.entity';

export class User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}
