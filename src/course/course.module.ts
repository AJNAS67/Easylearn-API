import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseSchema } from './model/course.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'course',schema:CourseSchema}]),CourseModule],
  controllers: [CourseController],

  providers: [CourseService]
})
export class CourseModule {}
