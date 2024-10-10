import { IsNotEmpty, IsString } from "class-validator";

export class ManufacturerDto {
    @IsNotEmpty({ message: "Название производителя не может быть пустым значением" })
    @IsString({ message: "Значение производителя должно быть строкой" })
    name: string;
}