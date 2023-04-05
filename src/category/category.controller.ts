import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from './model/category.model';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private _categoryService: CategoryService) {}
  @Post('add-category')
  async addCourse(@Body() categoryDto: Category) {
    return await this._categoryService.addCategory(categoryDto);
  }
  @Get('all_category')
  async getAllCategory(){
    return await this._categoryService.getAllCategory()
    
  }
}
