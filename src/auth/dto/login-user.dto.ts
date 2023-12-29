import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
