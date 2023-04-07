import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EnrolledCourse,
  EnrolledCourseDocument,
} from './model/enrolled-course.model';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class EnrolledCourseService {
  constructor(
    @InjectModel('EnrolledCourse')
    private readonly enrolledCourseModel: Model<EnrolledCourseDocument>,
  ) {}
  async enrollCourse(userId: string, enrolledDto: EnrolledCourse) {
    
    try {
      return await this.enrolledCourseModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        course: enrolledDto.course,
        totalPrice: enrolledDto.totalPrice,
        paymentStatus: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
