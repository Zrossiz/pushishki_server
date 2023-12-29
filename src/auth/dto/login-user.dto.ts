import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'username', description: 'User name' })
  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  username: string;

  @ApiProperty({ example: '1232qwerty', description: 'User password' })
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
