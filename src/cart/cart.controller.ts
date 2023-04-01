import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CartService } from './cart.service';
import { CourseService } from 'src/course/course.service';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private courseService: CourseService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('addToCart')
  async courseAddToCart(@Req() req, @Body() courseId: any) {
    return await this.cartService.addToCart(req.user._id, courseId.courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userCart')
  getUserCart(@Req() req) {
    return this.cartService.gatCart(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('removeFromCart/:id')
  async removeFromCart(@Req() req, @Param('id') courseId: string) {
    const course = await this.courseService.getCourse(courseId);
    return this.cartService.removeCart(req.user._id, courseId, course.Price);
  }
}
