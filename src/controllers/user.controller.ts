import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/providers/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  test() {
    return this.userService.hello();
  }
}
