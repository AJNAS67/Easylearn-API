import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/model/user.models';
import { Course } from 'src/course/model/course.model';

export type WishlistDocument = HydratedDocument<Wishlist>;

@Schema({ timestamps: true })
export class Wishlist {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: Course.name })
  course: [
    {
      courseId: mongoose.Types.ObjectId;
      courseName: String;
      price: number;
    },
  ];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
