import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
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
  async addCourse(@Req() req, @Body() courseDto: Course) {
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

  @UseGuards(JwtAuthGuard)
  @Get('mentor_course')
  getMentorCourse(@Req() req) {
    return this._courseService.findMentorCourse(req.user._id);
  }
  // @Get('course/:id')
  // getSubscribedCourse(@Param('id') id: string) {
  //   return this._courseService.subscribedCourse(id);
  // }

  @Delete('deleteCourse/:id')
  async deleteCourse(@Param('id') courseId: string) {
    return await this._courseService.removeCourse(courseId);
  }

  @Get('trending_courses')
  async getTrending() {
    return await this._courseService.findTrending();
  }
  @Get('featured_courses')
  async getFeatured() {
    return await this._courseService.findFeature();
  }
  @Get('popular_courses')
  async getPopularity() {
    return await this._courseService.findPopular();
  }
  @Get('ml_courses')
  async getMlCourses() {
    return await this._courseService.findML_Ai();
  }
  @Get('category_course/:id')
  async getCategoryCourse(@Param('id') id: string) {
    return await this._courseService.findCategoryBasedCourse(id)
  }
}
