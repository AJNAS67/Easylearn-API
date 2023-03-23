import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './model/profile.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('')
export class ProfileController {
  constructor(private profileService: ProfileService) {}



  @UseGuards(JwtAuthGuard)
  @Get('get_user_details')
  async getUserDetails(@Req() req): Promise<any[]>{
    const userDetails=await this.profileService.getUserDetails(req.user._id)
    return userDetails

  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async RegisterUser(@Req() req, @Body() profileDto: Profile) {
    const userDetails = await this.profileService.UserDetails(
      profileDto,
      req.user._id,
    );

    return { userDetails };
  }

  

}
