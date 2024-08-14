import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VoltageDto {
  @ApiProperty({
    example: 24,
    description: 'Значение вольтажа',
  })
  @IsNotEmpty({ message: 'Вольтаж не может быть пустым' })
  @IsNumber({}, { message: 'Вольтаж должен быть числом' })
  name: number;
}
