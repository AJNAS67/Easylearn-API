import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
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
}

