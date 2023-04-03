import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/model/user.models';
import { Course } from 'src/course/model/course.model';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: Course.name })
  course: [
    {
      courseId: mongoose.Types.ObjectId;
      courseName: String;
      price: number;
      image:string;
    },
  ];
  @Prop()
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
