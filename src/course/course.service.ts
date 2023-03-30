import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Course, CourseDocument } from './model/course.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('course')
    private readonly courseModel: Model<CourseDocument>,
  ) {}
  async addCourse(userId: any, course: Course) {
    console.log(course, 'course');

    try {
      return await this.courseModel.create({
        UserId: new mongoose.Types.ObjectId(userId),
        CourseName: course.CourseName,
        MentorName: course.MentorName,
        Category: course.Category,
        TotalHr: course.TotalHr,
        ThumbnailImage: course.ThumbnailImage,
        CourseDescription: course.CourseDescription,
        VideoModule: course.VideoModule,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCourses() {
    return await this.courseModel.find();
  }
  getHello() {
    return 'hi';
  }
}
