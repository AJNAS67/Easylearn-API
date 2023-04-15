import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
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

  @Patch('changeAdminStatus/:id')
  changeIsAdmin(
    @Param('id') id: string,
    @Body() isAdmin: { isAdmin: boolean },
  ) {
    return this.userService.updateUserAdminStatus(id, isAdmin.isAdmin);
  }
  @Patch('changeBlockStatus/:id')
  changeIsBlock(
    @Param('id') id: string,
    @Body() isBlock: { isBlock: boolean },
  ) {
    return this.userService.updateUserBlockStatus(id, isBlock.isBlock);
  }
}
