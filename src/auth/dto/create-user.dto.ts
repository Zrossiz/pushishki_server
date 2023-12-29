import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  readonly password: string;
}
