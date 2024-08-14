import { IsNotEmpty, IsString } from 'class-validator';

export class DriveDto {
  @IsNotEmpty({ message: 'Значение привода не может быть пустым' })
  @IsString({ message: 'Значение привода должно быть строкой' })
  name: string;
}
