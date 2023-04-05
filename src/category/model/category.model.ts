import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  course_category: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
