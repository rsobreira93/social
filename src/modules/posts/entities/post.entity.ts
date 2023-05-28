import { BaseEntity } from '@shared/utils/base.entity';

export class Post extends BaseEntity {
  title: string;
  description: string;
  mediaUrl?: string;
  ownerId: string;
}
