import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUserWithTokens } from 'src/interfaces';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async registration(
    createUserDto: CreateUserDto,
  ): Promise<User | { message: string }> {
    try {
      const existUser = await this.prismaService.user.findFirst({
        where: { email: createUserDto.email },
      });

      if (existUser) {
        throw new BadRequestException(
          'Пользователь с таким email уже зарегистрирован',
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
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
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
        throw new BadRequestException(
          'Пользователь с таким именем не зарегистрирован',
        );
      }

      const isPasswordValid = compareSync(
        loginUserDto.password,
        existUser.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Неверный логин или пароль');
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
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }
}
