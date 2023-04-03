import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CourseService } from './course.service';
import { Course, CourseDocument } from './model/course.model';

@Controller('course')
export class CourseController {
  propertyService: any;
  constructor(private _courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('add-course')
  async addCourse(
    @Req() req,
    @Body() courseDto: Course,
  ) {
    const course = await this._courseService.addCourse(req.user._id, courseDto);
    return course;
  }

  @Get('getCourses')
  getAllCourse() {
    return this._courseService.getAllCourses();
  }
  @Get('course/:id')
  getCourse(@Param('id') id: string): Promise<CourseDocument> {
    return this._courseService.getCourse(id);
  }
}
