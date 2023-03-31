import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CartDocument } from './model/cart.model';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('cart') private readonly cartModel: Model<CartDocument>,
    private courseService: CourseService,
  ) {}

  async addToCart(userId: any, courseId: any) {
    const getCourse = await this.courseService.getCourse(courseId);
    const cart = await this.cartModel.findOne({ userId });
    if (cart) {
      const courseIdExists = cart.course.some((course) => {
        return course.courseId.toString() === courseId.toString();
      });
      if (courseIdExists) {
        return { message: 'Course already exists in Cart' };
      } else {
        const data = await this.cartModel.findOneAndUpdate(
          { userId: userId },
          {
            $push: {
              course: {
                courseId: courseId,
                courseName: getCourse.CourseName,
                price: getCourse.Price,
              },
            },
            $inc: { totalPrice: getCourse.Price },
          },
        );

        return { message: 'Course Added to Cart!!' };
      }
    } else {
      const newCart = new this.cartModel({
        userId,
        course: [
          {
            courseId: courseId,
            courseName: getCourse.CourseName,
            price: getCourse.Price,
          },
        ],
        totalPrice: getCourse.Price,
      });
      newCart.save();
      return { message: 'Course successfully added!' };
    }
  }
}
