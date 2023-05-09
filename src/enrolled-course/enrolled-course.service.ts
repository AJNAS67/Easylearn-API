import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EnrolledCourse,
  EnrolledCourseDocument,
} from './model/enrolled-course.model';
import mongoose, { Model } from 'mongoose';
import { Course } from 'src/course/model/course.model';

@Injectable()
export class EnrolledCourseService {
  constructor(
    @InjectModel('EnrolledCourse')
    private readonly enrolledCourseModel: Model<EnrolledCourseDocument>,
  ) {}
  async enrollCourse(userId: string, enrolledDto: EnrolledCourse) {
    try {
      const course1 = enrolledDto.course.map((course) => {
        return {
          ...course,
          courseId: new mongoose.Types.ObjectId(course.courseId),
        };
      });

      await this.enrolledCourseModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        course: course1,
        totalPrice: enrolledDto.totalPrice,
        paymentStatus: true,
      });

      return {
        message: 'Payment successfully complected',
        paymentStatus: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getEnrolledCourse(userId: string) {
    return await this.enrolledCourseModel
      .find({
        userId: new mongoose.Types.ObjectId(userId),
      })
      .populate({ path: 'course.courseId', model: Course.name });
  }

  async findTotalPrice() {
    const enrolledCourse = await this.enrolledCourseModel.find().exec();
    // enrolledCourse.reduce((acc,cur)=>
    //   acc+cur.totalPrice;
    // )
    const totalPrice = enrolledCourse.reduce(
      (sum, product) => sum + product.totalPrice,
      0,
    );

    return totalPrice;
  }
  async getAllOrder() {
    return await this.enrolledCourseModel.find().exec();
  }
}
