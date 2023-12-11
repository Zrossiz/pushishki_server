import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserWithTokens } from 'src/interfaces';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { User } from '@prisma/client';
import { LoginUserDto } from 'src/user/dto/login-user-dto';

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
        role: 'ADMIN',
      };
      const newUser = await this.prismaService.user.create({
        data: userData,
      });
      return newUser;
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<IUserWithTokens | { message: string }> {
    try {
      const existUser = await this.prismaService.user.findFirst({
        where: { username: loginUserDto.username },
      });

      if (!existUser) {
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Пользователь с таким именем не зарегестрирован',
          },
          400,
        );
      }

      const isPasswordValid = compareSync(
        loginUserDto.password,
        existUser.password,
      );

      if (!isPasswordValid) {
        return new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Неверный логин или пароль',
          },
          400,
        );
      }

      return {
        tokens: {
          refreshToken: '123',
          acccesToken: '1234',
        },
        user: existUser,
      };
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
