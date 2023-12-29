import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registration(createUserDto);
  }

  @ApiBody({ type: LoginUserDto })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
}
