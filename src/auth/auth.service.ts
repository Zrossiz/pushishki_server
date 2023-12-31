import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IUserWithToken } from 'src/shared/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(
    createUserDto: CreateUserDto,
  ): Promise<IUserWithToken | { message: string }> {
    try {
      const existUser = await this.prismaService.user.findFirst({
        where: { username: createUserDto.username },
      });

      if (existUser) {
        throw new BadRequestException(
          'Пользователь с таким именем не зарегестрирован',
        );
      }
      const hashedPassword = hashSync(createUserDto.password, genSaltSync(10));
      const userData = {
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
      };
      const newUser = await this.prismaService.user.create({
        data: userData,
      });

      const { token } = this.generateToken(newUser.id, newUser.username);

      const populatedData = {
        id: newUser.id,
        username: newUser.username,
        token,
      };

      return populatedData;
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
  ): Promise<IUserWithToken | { message: string }> {
    try {
      const existUser = await this.prismaService.user.findFirst({
        where: { username: loginUserDto.username },
      });

      if (!existUser) {
        throw new BadRequestException(
          'Пользователь с таким именем не зарегестрирован',
        );
      }

      const isPasswordValid = compareSync(
        loginUserDto.password,
        existUser.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Неверный логин или пароль');
      }

      const { token } = this.generateToken(existUser.id, existUser.username);

      const populatedData = {
        id: existUser.id,
        username: existUser.username,
        token,
      };

      return populatedData;
    } catch (err) {
      console.log(err);
      if (`${err.status}`.startsWith('4')) {
        throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException('Ошибка сервера');
    }
  }

  private generateToken = (id: number, username: string) => {
    const payload = { id, username };

    return {
      token: this.jwtService.sign(payload),
    };
  };
}
