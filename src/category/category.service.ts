import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './model/category.model';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async addCategory(categoryDto: Category) {
    try {
      return await this.categoryModel.create({
        course_category: categoryDto.course_category,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getAllCategory() {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
