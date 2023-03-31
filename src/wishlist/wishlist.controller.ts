import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { WishlistService } from './wishlist.service';

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
}
