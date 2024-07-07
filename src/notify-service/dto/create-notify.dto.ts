import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotifyDto {
  @ApiProperty({ example: '79996305109' })
  @IsNotEmpty({ message: 'Получатель не может быть пустым значением' })
  @IsString({ message: 'Номер получателя должен быть строкой' })
  destination: string;

  @ApiProperty({ example: 'Привет из сервиса уведомлений' })
  @IsNotEmpty({ message: 'Текст уведомления не может быть пустой строкой' })
  @IsString({ message: 'Текст уведомления должен быть строкой' })
  text: string;
}
