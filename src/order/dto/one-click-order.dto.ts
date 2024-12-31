import { IsNotEmpty, IsString } from 'class-validator';

export class OneClickOrderDTO {
  @IsNotEmpty({ message: 'Имя заказчика не может быть пустым' })
  @IsString({ message: 'Имя заказчика должно быть строкой' })
  name: string;

  @IsNotEmpty({ message: 'Телефон заказчика не может быть пустым' })
  @IsString({ message: 'Телефон заказчика должен быть строкой' })
  phone: string;

  @IsNotEmpty({ message: 'Название товара не может быть пустым' })
  @IsString({ message: 'Название товара должно быть строкой' })
  productName: string;

  @IsNotEmpty({ message: 'Адрес страницы не может быть пустым' })
  @IsString({ message: 'Адрес страницы должен быть строкой' })
  link: string;
}
