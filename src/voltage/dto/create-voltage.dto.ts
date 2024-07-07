import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVoltageDto {
    @IsNotEmpty({ message: "Вольтаж не может быть пустым" })
    @IsNumber({}, { message: "Вольтаж должен быть числом" })
    value: number;

    @IsNotEmpty({ message: "Ключ на продукт не может быть пустым" })
    @IsNumber({}, { message: "Ключ на продукт должен быть числом" })
    productId: number;
}