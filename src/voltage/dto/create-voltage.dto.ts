import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVoltageDto {
  @ApiProperty({
    example: 24,
    description: 'Значение вольтажа',
  })
  @IsNotEmpty({ message: 'Вольтаж не может быть пустым' })
  @IsNumber({}, { message: 'Вольтаж должен быть числом' })
  value: number;

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ на продукт',
  })
  @IsNotEmpty({ message: 'Ключ на продукт не может быть пустым' })
  @IsNumber({}, { message: 'Ключ на продукт должен быть числом' })
  productId: number;
}
