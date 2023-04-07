import { Module } from '@nestjs/common';
import { EnrolledCourseController } from './enrolled-course.controller';
import { EnrolledCourseService } from './enrolled-course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrolledCourseSchema } from './model/enrolled-course.model';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EnrolledCourse', schema: EnrolledCourseSchema },
    ]),
    EnrolledCourseModule,
    CartModule
  ],
  controllers: [EnrolledCourseController],
  providers: [EnrolledCourseService],
})
export class EnrolledCourseModule {}
