import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CourseService } from './course.service';
import { Course } from './model/course.model';

@Controller('course')
export class CourseController {
  constructor(private _courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))

  @Post('add-course')
  async addCourse(@Req() req,@Body() courseDto: Course,@UploadedFile() file: Express.Multer.File) {
    console.log(file,'file');
    
  


    console.log(courseDto, 'coyda');
    

    const course = await this._courseService.addCourse(req.user._id, courseDto);
    console.log(course, 'sdsdd');

    return course;
  }
  @Get('')
  async getCourse() {
    return this._courseService.getHello();
  }
}
