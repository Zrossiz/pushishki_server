import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'username', description: 'User name' })
  @IsNotEmpty({ message: 'Имя пользователя не может быть пустым' })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @MinLength(3, { message: 'Имя пользователя должно быть больше 3 символов' })
  readonly username: string;

  @ApiProperty({ example: '1232qwerty', description: 'User password' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(6, { message: 'Длина пароля должна быть больше 6 символов' })
  @IsString({ message: 'Пароль должен быть строкой' })
  readonly password: string;
}
