import { IsNotEmpty, IsString } from 'class-validator';

export class ListPostsByUserQuery {
  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  perPage: string;
}
