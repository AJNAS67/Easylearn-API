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
        Level: course.Level,
        Language: course.Language,
        Price: course.Price,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCourses() {
    return await this.courseModel.find();
  }
  async getCourse(id: string) {
    return await this.courseModel.findById(id);
  }
  async findMentorCourse(userId: string) {
    return await this.courseModel.find({
      UserId: new mongoose.Types.ObjectId(userId),
    });
  }
}
