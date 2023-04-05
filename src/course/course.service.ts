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
        Popularity: course.Popularity,
        Trending: course.Trending,
        Featured: course.Featured,
        AI_and_ML: course.AI_and_ML,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findMentorCourse(userId: string) {
    return await this.courseModel.find({
      UserId: new mongoose.Types.ObjectId(userId),
    });
  }
  async removeCourse(courseId: string) {
    console.log(courseId);
    return await this.courseModel.deleteOne({ _id: courseId });
  }
  async getCourse(id: string) {
    return await this.courseModel.findById(id);
  }
  async getAllCourses() {
    return await this.courseModel.find().populate('Category').exec();
  }
  async findTrending() {
    return await this.courseModel.find({ Trending: true }).exec();
  }
  async findFeature() {
    return await this.courseModel.find({ Featured: true }).exec();
  }
  async findPopular() {
    return await this.courseModel.find({ Popularity: true }).exec();
  }
  async findML_Ai() {
    return await this.courseModel.find({ AI_and_ML: true }).exec();
  }
  async findCategoryBasedCourse(id: string) {
    try {
      return await this.courseModel.find({ Category: id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
