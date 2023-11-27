import { genSaltSync, hashSync } from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user-dto';
import { User } from 'src/interfaces/User';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async registration(
    createUserDto: CreateUserDto,
  ): Promise<User | { message: string }> {
    try {
      const existUser = await this.prismaService.user.findFirst({
        where: { email: createUserDto.email },
      });

      if (existUser) {
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Пользователь с таким email уже зарегистрирован',
          },
          400,
        );
      }
      const hashedPassword = hashSync(createUserDto.password, genSaltSync(10));
      const userData = {
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
        role: 'USER',
      };
      const newUser = await this.prismaService.user.create({
        data: userData,
      });
      return newUser;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  login() {
    return {
      message: 'login',
    };
  }
}
