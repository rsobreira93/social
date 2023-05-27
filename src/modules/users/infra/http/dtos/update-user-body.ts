import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserBody {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  birthDate: string;
}
