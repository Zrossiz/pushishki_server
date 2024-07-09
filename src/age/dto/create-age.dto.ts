import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAgeDto {
  @ApiProperty({
    example: '2-4',
    description: 'Значение возраста',
  })
  @IsNotEmpty({ message: 'Возраст не может быть пустым' })
  @IsString({ message: 'Возраст должен быть строкой' })
  value: string;
}
