import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Course } from 'src/course/model/course.model';
import { User } from 'src/user/model/user.models';

export type EnrolledCourseDocument = HydratedDocument<EnrolledCourse>;

@Schema()
export class EnrolledCourse {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: Course.name })
  course: [
    {
      courseId: mongoose.Types.ObjectId;
      courseName: String;
      price: number;
      image: string;
    },
  ];
  @Prop()
  totalPrice: number;

  @Prop()
  paymentStatus: boolean;

  @Prop({ default: Date.now })
  date: Date;
}

export const EnrolledCourseSchema =
  SchemaFactory.createForClass(EnrolledCourse);
