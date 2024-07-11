import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { generateSlug } from 'src/shared/helpers';

@Injectable()
export class SubCategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createSubCategoryDto: CreateSubCategoryDto): Promise<CreateSubCategoryDto> {
        try {
            const category = await this.prismaService.category.findFirst({
                where: {
                    id: createSubCategoryDto.categoryId
                }
            });

            if (!category) {
                throw new BadRequestException("Категория не найдена")
            };

            const slug: string = generateSlug(createSubCategoryDto.name);

            const subCategory = await this.prismaService.subCategory.create({
                data: {
                    ...createSubCategoryDto,
                    slug
                }
            });

            return subCategory;
        } catch (err) {
            if (`${err.status}`.startsWith('4')) {
                throw new HttpException(err.response, err.status);
            }
            console.log(err);
            throw new InternalServerErrorException('Ошибка сервера');
        }
    }
}
