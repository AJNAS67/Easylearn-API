import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseService } from 'src/course/course.service';
import { WishlistDocument } from './model/wishlist.model';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('wishlist')
    private readonly wishlistModel: Model<WishlistDocument>,
    private _courseService: CourseService,
  ) {}
  async addToWishlist(userId, courseId) {
    const wishlist = await this.wishlistModel.findOne({ userId });
    const getCourse = await this._courseService.getCourse(courseId);

    if (wishlist) {
      const courseIdExists = wishlist.course.some((course) => {
        return course.courseId.toString() === courseId.toString();
      });
      if (courseIdExists) {
        return { message: 'Course already exists in Wishlist' };
      } else {
        await this.wishlistModel.findOneAndUpdate(
          { userId: userId },
          {
            $push: {
              course: {
                courseId: courseId,
                courseName: getCourse.CourseName,
                price: getCourse.Price,
              },
            },
          },
        );

        return { message: 'Course Added to Wishlist!!' };
      }
    } else {
      const newWishlist = new this.wishlistModel({
        userId,
        course: [
          {
            courseId: courseId,
            courseName: getCourse.CourseName,
            price: getCourse.Price,
          },
        ],
      });
      newWishlist.save();
      return { message: 'Course successfully added!' };
    }
  }

  async gatWishlist(userId: string) {
    return await this.wishlistModel.findOne({ userId });
  }
  async removeWishlist(userId: string, courseId: string) {
    return await this.wishlistModel
      .updateOne({ userId }, { $pull: { course: { courseId } } })
      .exec();
  }
}
