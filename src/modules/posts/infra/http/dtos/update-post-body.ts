import { IsOptional, IsString } from 'class-validator';

export class UpdatePostBody {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
