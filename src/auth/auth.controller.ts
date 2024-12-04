import { Body, Controller, Post, Get, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './auth.guard';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({ type: CreateUserDto })
  @UsePipes(ValidationPipe)
  @Post('signup')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registration(createUserDto);
  }

  @ApiOperation({ summary: 'Идентификация пользователя' })
  @ApiBody({ type: LoginUserDto })
  @UsePipes(ValidationPipe)
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response
  ) {
    const userWithToken = await this.authService.login(loginUserDto);
    res.cookie('access_token', userWithToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });
  
    return res.json(userWithToken);
  }

  @ApiOperation({ summary: 'Проверка токена' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @UseGuards(JwtAuthGuard)
  @Get('check')
  async checkUser() {
    return {
      message: 'Success',
    };
  }
}
