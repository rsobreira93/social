import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ListUsersQuery {
  @IsOptional()
  nameContains?: string;

  @IsOptional()
  emailContains?: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  perPage: string;
}
