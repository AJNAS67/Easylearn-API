import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CourseService } from 'src/course/course.service';
@Controller('admin')
export class AdminController {
  constructor(
    private userService: UserService,
    private courseService: CourseService,
  ) {}

  @Get('users')
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('courses')
  getAllCourses() {
    return this.courseService.getAllCourses();
  }
}
