import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ListPostsQuery {
  @IsOptional()
  titleContains?: string;

  @IsOptional()
  descriptionContains?: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  perPage: string;
}
