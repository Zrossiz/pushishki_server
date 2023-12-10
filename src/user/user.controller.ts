import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.userService.registration(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }
}
