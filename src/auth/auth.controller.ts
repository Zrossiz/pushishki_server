import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async registration(@Body() createUserDto) {
    return await this.authService.registration(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto) {
    return await this.authService.login(loginUserDto);
  }
}
