import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(registerService: UserService) {}
  @Post('register')
  async RegisterUser(
    @Body('firtName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phineNumber') phineNumber: number,
    @Body('password') password: string,
  ) {}
}
