import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/model/user.models';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  UserId: mongoose.Types.ObjectId;

  @Prop()
  CourseName: string;

  @Prop()
  MentorName: string;

  @Prop()
  Category: string;

  @Prop()
  TotalHr: number;

  @Prop()
  ThumbnailImage: string;

  @Prop()
  CourseDescription: string;

  @Prop()
  Level: string;

  @Prop()
  Language: string;

  @Prop()
  Price: number;

  @Prop()
  VideoModule: [{ title: string; video: string }];

  @Prop({ default: Date.now })
  date: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
