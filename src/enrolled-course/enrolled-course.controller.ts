import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
    await this.cartService.deleteCart(req.user._id);
    return order;
  }

  @UseGuards(JwtAuthGuard)
  @Get('get_enrolled_course')
  async getEnrolledCourse(@Req() req) {
    return await this._enrolledCourse.getEnrolledCourse(req.user._id);
  }
  @Get('get_total')
  async findTotal() {
    return this._enrolledCourse.findTotalPrice();
  }
  @Get('all_order')
  async getAllOrder() {
    return this._enrolledCourse.getAllOrder();
  }
}
