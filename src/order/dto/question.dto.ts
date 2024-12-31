import { IsNotEmpty, IsString } from 'class-validator';

export class QuestionOrderDTO {
  @IsNotEmpty({ message: 'Имя не может быть пустым значением' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @IsNotEmpty({ message: 'Телефон не может быть пустым значением' })
  @IsString({ message: 'Телефон должен быть строкой' })
  phone: string;

  @IsNotEmpty({ message: 'Вопрос не может быть пустым значением' })
  @IsString({ message: 'Вопрос должен быть строкой' })
  question: string;

  @IsNotEmpty({ message: 'Адрес страницы не может быть пустым' })
  @IsString({ message: 'Адрес страницы должен быть строкой' })
  link: string;
}
