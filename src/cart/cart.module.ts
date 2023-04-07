import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from 'src/course/course.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartSchema } from './model/cart.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'cart', schema: CartSchema }]),
    CartModule,
    CourseModule,
  ],

  controllers: [CartController],
  providers: [CartService],
  exports:[CartService]
})
export class CartModule {}
