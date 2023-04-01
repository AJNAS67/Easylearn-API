import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { WishlistService } from './wishlist.service';
import { log } from 'console';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addToWishlist')
  async courseAddToWishlist(@Req() req, @Body() courseId: any) {
    return await this.wishlistService.addToWishlist(
      req.user._id,
      courseId.courseId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('userWishlist')
  async getUserCart(@Req() req) {
    return await this.wishlistService.gatWishlist(req.user._id);
  }
}
