import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreatePostBody {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 255)
  description: string;

  @IsUUID()
  @IsNotEmpty()
  ownerId: string;
}
