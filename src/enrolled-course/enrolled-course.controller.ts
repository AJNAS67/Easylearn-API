import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EnrolledCourseService } from './enrolled-course.service';
import { EnrolledCourse } from './model/enrolled-course.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CartService } from 'src/cart/cart.service';

@Controller('enrolled-course')
export class EnrolledCourseController {
  constructor(
    private _enrolledCourse: EnrolledCourseService,
    private cartService: CartService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('subscribeCourse')
  async checkoutCart(@Req() req, @Body() enrolledDto: EnrolledCourse) {
    const order = await this._enrolledCourse.enrollCourse(
      req.user._id,
      enrolledDto,
    );
   const deleteCart= await this.cartService.deleteCart(req.user._id);
    return order;
  }
}
