import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './auth.guard';

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
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Проверка токена' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @UseGuards(JwtAuthGuard)
  @Post('check')
  async checkUser() {
    return {
      message: 'Success',
    };
  }
}
