import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CourseModule } from './course/course.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { EnrolledCourseModule } from './enrolled-course/enrolled-course.module';


@Module({
  imports: [
    UserModule,
    
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ProfileModule,
    AuthModule,
    CloudinaryModule,
    CourseModule,
    CartModule,
    WishlistModule,
    AdminModule,
    CategoryModule,
    EnrolledCourseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

