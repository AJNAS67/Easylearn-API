import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  controllers: [AdminController],
  imports: [UserModule, CourseModule],
})
export class AdminModule {}
