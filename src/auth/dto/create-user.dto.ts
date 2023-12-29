import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'User mail' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'username', description: 'User name' })
  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  readonly username: string;

  @ApiProperty({ example: '1232qwerty', description: 'User password' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  readonly password: string;
}
