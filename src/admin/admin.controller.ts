import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('admin')
export class AdminController {
  constructor(private userService: UserService) {}

  @Get('users')
  getAllCourse() {
    return this.userService.findAll();
  }
}
