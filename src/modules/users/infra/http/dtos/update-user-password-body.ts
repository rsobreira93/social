import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordBody {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;
}
